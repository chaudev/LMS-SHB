import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { Form, Modal } from 'antd'
import moment, { Moment } from 'moment'
import { FC, useEffect, useState } from 'react'
import { dormitoryRegisterApi } from '~/api/dormitory/dormitory-register'
import MyDatePicker from '~/atomic/atoms/MyDatePicker'
import MyDateRangePicker from '~/atomic/atoms/MyDateRangePicker'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MySelect from '~/atomic/atoms/MySelect'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectUserAvailable from '~/atomic/molecules/MySelectUserAvailable'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import useQueryDormitoryAll from '~/common/hooks/useQueryDormitoryAll'
import { formRequired } from '~/common/libs/others/form'
import { ShowNoti } from '~/common/utils'
import { Edit } from 'react-feather'

type TProps = {
	defaultData: TDormitoryItem | null
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TDormitoryItem[], Error>>
}

const initialValueMonth = {
	month: 12
}

const ModalCreateUpdate: FC<TProps> = ({ defaultData, refetch }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [form] = Form.useForm<TDormitoryPOSTAndPUT & { StartDate: Moment; EndDate: Moment }>()
	const { data, isLoading } = useQueryDormitoryAll()

	const DormitoryId = Form.useWatch('DormitoryId', form)
	const monthChange = Form.useWatch('month', form)
	const startDateChange = Form.useWatch('StartDate', form)
	const priceChange = Form.useWatch('Price', form)

	const handleToggleModal = () => {
		setOpen(!open)
		form.resetFields()
	}

	useEffect(() => {
		if (monthChange && startDateChange) {
			handleCalendarChange(startDateChange)
		}
	}, [monthChange, startDateChange])

	useEffect(() => {
		if (data && DormitoryId) {
			const target = data.data.find((item) => item.Id === DormitoryId)
			form.setFieldValue('Price', target.Fee)
		}

		if (!DormitoryId) {
			form.setFieldValue('Price', undefined)
		}
	}, [DormitoryId])

	useEffect(() => {
		if (defaultData !== null && open) {
			form.setFieldsValue({
				...defaultData,
				StartDate: moment(defaultData.StartDate) as any,
				EndDate: moment(defaultData.EndDate) as any
			})
		}
	}, [defaultData, open])

	const mutationCreate = useMutation({
		mutationKey: [dormitoryRegisterApi.keyCreate],
		mutationFn: async (data: TDormitoryPOSTAndPUT) => await dormitoryRegisterApi.create(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Tạo mới thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const mutationUpdate = useMutation({
		mutationKey: [dormitoryRegisterApi.keyUpdate],
		mutationFn: async (data: TDormitoryPOSTAndPUT) => await dormitoryRegisterApi.update(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Cập nhật thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const handleSubmit = async (data: TDormitoryPOSTAndPUT & { StartDate: Moment; EndDate: Moment }) => {
		const dataSend = {
			...data,
			StartDate: moment(data.StartDate).toISOString(),
			EndDate: moment(data.EndDate).toISOString()
		}
		if (defaultData === null) {
			await mutationCreate.mutateAsync(dataSend)
		} else {
			await mutationUpdate.mutateAsync({ ...dataSend, Id: defaultData.Id })
		}
	}

	const handleCalendarChange = (StartDate) => {
		if (StartDate) {
			const monthsToAdd = monthChange || initialValueMonth.month
			const calculatedEndDate: any = moment(StartDate).add(monthsToAdd, 'months').endOf('day')
			form.setFieldsValue({
				EndDate: calculatedEndDate
			})
		} else {
			form.setFieldsValue({
				EndDate: null
			})
		}
	}

	const disablePastDates = (currentDate) => {
		return currentDate && currentDate < moment().startOf('day')
	}

	return (
		<>
			{defaultData !== null ? (
				// <IconButton onClick={handleToggleModal} type="button" background="transparent" color="yellow" icon="edit" tooltip="Cập nhật" />
				<button onClick={handleToggleModal} type="button" className="flex items-center gap-2.5 py-1 hover:text-tw-green">
					<Edit size={20} />
					<p>Cập nhật</p>
				</button>
			) : (
				<PrimaryButton onClick={handleToggleModal} type="button" background="green" icon="add">
					Tạo mới
				</PrimaryButton>
			)}

			<Modal
				centered
				open={open}
				onCancel={handleToggleModal}
				footer={
					<div className="flex gap-2 justify-center">
						<PrimaryButton disable={false} onClick={handleToggleModal} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton loading={false} onClick={() => form.submit()} background="primary" icon="save" type="button">
							{`${defaultData === null ? 'Tạo' : 'Lưu'}`}
						</PrimaryButton>
					</div>
				}
				title={`${defaultData === null ? 'Tạo mới' : 'Cập nhật'} đăng ký KTX`}
			>
				<div className="max-h-[70vh] overflow-auto">
					<Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={initialValueMonth}>
						<Form.Item name={'StudentId'} label="Học viên" rules={formRequired}>
							<MySelectUserAvailable roleId={3} placeholder="Chọn học viên" />
						</Form.Item>
						<Form.Item name={'DormitoryId'} label="Ký túc xá" rules={formRequired}>
							<MySelect
								options={data?.data.map((item) => ({
									label: item.Name,
									value: item.Id
								}))}
								placeholder="Chọn ký túc xá"
							/>
						</Form.Item>
						<Form.Item name={'Price'} label="Chi phí hàng tháng" rules={formRequired}>
							<MyInputNumber placeholder="Chi phí theo tháng" disabled={!Boolean(DormitoryId)} />
						</Form.Item>
						<Form.Item name="month" label="Số tháng ở" rules={formRequired}>
							<MyInputNumber min={1} defaultValue={initialValueMonth.month} max={500} placeholder="chọn tháng" />
						</Form.Item>
						<div className="flex items-center gap-4">
							<div className="basis-1/2">
								<Form.Item name={'StartDate'} rules={formRequired} label="Ngày bắt đầu">
									<MyDatePicker
										placeholder="Ngày bắt đầu"
										disabled={!monthChange}
										disabledDate={disablePastDates}
										onChange={handleCalendarChange}
										format={'DD/MM/YYYY'}
									/>
								</Form.Item>
							</div>
							<div className="basis-1/2">
								<Form.Item name={'EndDate'} rules={formRequired} label="Ngày đến hạn">
									<MyDatePicker placeholder="Ngày kết thúc" disabled={true} format={'DD/MM/YYYY'} />
								</Form.Item>
							</div>
						</div>
						<div className="mb-2">
							Tổng chi phí:{' '}
							<span className="font-semibold">
								{priceChange && monthChange ? Intl.NumberFormat('ja-JP').format(priceChange * monthChange) : 0} VND
							</span>
						</div>
						<Form.Item name={'Note'} label="Ghi chú">
							<MyTextArea rows={4} placeholder="Mô tả" />
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	)
}

export default ModalCreateUpdate
