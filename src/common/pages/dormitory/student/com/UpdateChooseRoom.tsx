import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { Form, Modal } from 'antd'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { dormitoryRegisterApi } from '~/api/dormitory/dormitory-register'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MySelectDormitoryArea from '~/atomic/molecules/MySelectDormitoryArea'
import MySelectDormitoryRoom from '~/atomic/molecules/MySelectDormitoryRoom'
import MySelectPaymentMethods from '~/atomic/molecules/MySelectPaymentMethods'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNoti } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'

type TProps = {
	data: TDormitoryItem
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TDormitoryItem[], Error>>
	type: 'change-room' | 'choose-room'
}

export const UpdateChooseRoom: FC<TProps> = ({ data, refetch, type }) => {
	const [form] = Form.useForm<TDormitoryChoosenRoom>()
	const DormitoryAreaId = Form.useWatch('DormitoryAreaId', form)

	const [open, setOpen] = useState<boolean>(false)

	const handleToggleModal = () => {
		setOpen(!open)
		form.resetFields()
	}

	useEffect(() => {
		if (open && data && type === 'change-room') {
			form.setFieldsValue({
				DormitoryAreaId: data.DormitoryAreaId,
				DormitoryRoomId: data.DormitoryRoomId
			})
		}
	}, [open, data, type])

	useEffect(() => {
		if (DormitoryAreaId !== data.DormitoryAreaId) {
			console.log("object");
			form.setFieldValue('DormitoryRoomId', undefined)
		}
	}, [DormitoryAreaId])

	// useEffect(() => {
	// 	if (!data.Id && !open) return

	// 	form.setFieldsValue({
	// 		Id: data.Id,
	// 		DormitoryAreaId: data.DormitoryAreaId,
	// 		DormitoryRoomId: data.DormitoryRoomId
	// 	})
	// }, [data.Id])

	const mutationCreate = useMutation({
		mutationKey: [dormitoryRegisterApi.keyCreate],
		mutationFn: async (data: TDormitoryChoosenRoom) => await dormitoryRegisterApi.chooseRoom(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Tạo mới thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const mutationChange = useMutation({
		mutationKey: [dormitoryRegisterApi.keyChangeDormitoryRoom],
		mutationFn: async (data: TDormitoryChoosenRoom) => await dormitoryRegisterApi.changeDormitoryRoom(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Đổi khu thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const handleSubmit = async (dataSend: TDormitoryChoosenRoom) => {
		if (type === 'choose-room') {
			await mutationCreate.mutateAsync({
				...dataSend,
				Id: data.Id
			})
		} else {
			await mutationChange.mutateAsync({
				...dataSend,
				Id: data.Id,
				DateChange: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
			})
		}
	}

	const isLoading = mutationChange.isPending || mutationCreate.isPending

	return (
		<>
			<IconButton
				color="green"
				type="button"
				icon={type === 'choose-room' ? 'add' : 'edit3'}
				tooltip={`${type === 'choose-room' ? 'Nhập' : 'Đổi'} khu ký túc xá`}
				onClick={handleToggleModal}
			/>
			<Modal
				centered
				open={open}
				onCancel={handleToggleModal}
				footer={
					<div className="flex gap-2 justify-center">
						<PrimaryButton disable={isLoading} onClick={handleToggleModal} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton loading={isLoading} onClick={() => form.submit()} background="primary" icon="save" type="button">
							{type === 'choose-room' ? 'Thêm khu' : 'Đổi khu'}
						</PrimaryButton>
					</div>
				}
				title={`${type === 'choose-room' ? 'Thêm' : 'Đổi'} khu ký túc xá`}
			>
				<div className="max-h-[70vh] overflow-auto">
					<div className="bg-[#b32025] p-2 rounded-md mb-4 text-white">
						<div className="flex items-center justify-between">
							<span>Ký túc xá:</span>
							<span>{data?.DormitoryName || '-'}</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Chi phí:</span>
							<span>{parseToMoney(data.Price) || '-'}</span>
						</div>
					</div>
					<Form layout="vertical" form={form} onFinish={handleSubmit} disabled={isLoading}>
						<Form.Item label="Khu ký túc xá" name={'DormitoryAreaId'} rules={formRequired}>
							<MySelectDormitoryArea DormitoryId={data.DormitoryId} disabled={!Boolean(data.DormitoryId)} />
						</Form.Item>

						<Form.Item label="Phòng ký túc xá" name={'DormitoryRoomId'} rules={formRequired}>
							<MySelectDormitoryRoom
								DormitoryId={data.DormitoryId}
								DormitoryAreaId={DormitoryAreaId}
								disabled={!Boolean(DormitoryAreaId) || !Boolean(data.DormitoryId)}
							/>
						</Form.Item>

						{type === 'choose-room' && (
							<>
								<Form.Item label="Thanh toán" name={'Paid'} rules={formRequired}>
									<MyInputNumber placeholder="Số tiền thanh toán" min={0} max={data.Price} />
								</Form.Item>
								<Form.Item label="Phương thức thanh toán" name={'PaymentMethodId'} rules={formRequired}>
									<MySelectPaymentMethods />
								</Form.Item>
							</>
						)}
					</Form>
				</div>
			</Modal>
		</>
	)
}
