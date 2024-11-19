import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { Form, Modal } from 'antd'
import moment, { Moment } from 'moment'
import { FC, useEffect, useState } from 'react'
import { dormitoryRegisterApi } from '~/api/dormitory/dormitory-register'
import MyDateRangePicker from '~/atomic/atoms/MyDateRangePicker'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MySelect from '~/atomic/atoms/MySelect'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectUserAvailable from '~/atomic/molecules/MySelectUserAvailable'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import useQueryDormitoryAll from '~/common/hooks/useQueryDormitoryAll'
import { formRequired } from '~/common/libs/others/form'
import SelectUserRegisterDormitory from '~/common/pages/dormitory/student/com/SelectUserRegisterDormitory'
import { ShowNoti } from '~/common/utils'

type TProps = {
	defaultData: TDormitoryItem | null
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TDormitoryItem[], Error>>
}

const ModalCreateUpdate: FC<TProps> = ({ defaultData, refetch }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [form] = Form.useForm<TDormitoryPOSTAndPUT & { Date: [Moment, Moment] }>()
	const { data, isLoading } = useQueryDormitoryAll()

	const DormitoryId = Form.useWatch('DormitoryId', form)

	const handleToggleModal = () => {
		setOpen(!open)
		form.resetFields()
	}

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
        Date: [
          moment(defaultData.StartDate),
          moment(defaultData.EndDate)
        ]
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

	const handleSubmit = async (data: TDormitoryPOSTAndPUT & { Date: [Moment, Moment] }) => {
		const dataSend = {
			...data,
			StartDate: moment(data.Date[0]).toISOString(),
			EndDate: moment(data.Date[1]).toISOString()
		}

		delete dataSend.Date

    if (defaultData === null) {
      await mutationCreate.mutateAsync(dataSend)
    } else {
      await mutationUpdate.mutateAsync({...dataSend, Id: defaultData.Id})
    }
	}

	return (
		<>
			{defaultData !== null ? (
				<IconButton onClick={handleToggleModal} type="button" background="transparent" color="yellow" icon="edit" tooltip="Cập nhật" />
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
					<Form form={form} layout="vertical" onFinish={handleSubmit}>
						<Form.Item name={'StudentId'} label="Học viên" rules={formRequired}>
							{/* <MySelectUserAvailable roleId={3} placeholder="Chọn học viên" /> */}
							<SelectUserRegisterDormitory placeholder="Chọn học viên" />
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
						<Form.Item name={'Price'} label="Chi phí" rules={formRequired}>
							<MyInputNumber placeholder="Chi phí theo tháng" disabled={!Boolean(DormitoryId)} />
						</Form.Item>
						<Form.Item name={"Date"} rules={formRequired} label="Thời gian">
							<MyDateRangePicker
								placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                format={'DD/MM/YYYY - HH:mm'}
								// onChange={(value) => {
								// 	if (value && value[0] && value[1]) {
								// 		form.setFieldValue('StartDate', value ? moment(value[0]).format('DD/MM/YYYY - HH:mm') : undefined)
								// 		form.setFieldValue('EndDate', value ? moment(value[1]).format('DD/MM/YYYY - HH:mm') : undefined)
								// 	}
								// }}
							/>
						</Form.Item>
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
