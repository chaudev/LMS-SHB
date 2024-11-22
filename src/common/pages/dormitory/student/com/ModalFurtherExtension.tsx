import { useState, useEffect } from 'react'
import { MdOutlineAutorenew } from 'react-icons/md'
import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'

import dormitoryExtendRegistrationApi from '~/api/dormitory/dormitoryExtend-registration'

import MyForm from '~/atomic/atoms/MyForm'
import MyModal from '~/atomic/atoms/MyModal'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MyTextArea from '~/atomic/atoms/MyTextArea'

import PrimaryButton from '~/common/components/Primary/Button'
import { formRequired } from '~/common/libs/others/form'
import { ShowNoti } from '~/common/utils'

interface ModalFurtherExtensionProps {
	data: TDormitoryItem
}

interface FormData {
	Price: number
	Month: number
	Note: string
}

export default function ModalFurtherExtension({ data }: ModalFurtherExtensionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [form] = Form.useForm<FormData>()

	const addDormitoryExtendRegistrationMutation = useMutation({
		mutationFn: dormitoryExtendRegistrationApi.addDormitoryExtendRegistration
	})

	const monthChange = Form.useWatch('Month', form)
	const priceChange = Form.useWatch('Price', form)

	useEffect(() => {
		form.setFieldsValue({
			Price: data.Price,
			Month: 6
		})
	}, [data])

	const showMoldal = () => setIsOpen(true)
	const toggleModal = () => setIsOpen(!isOpen)

	const onSubmit = async (values: FormData) => {
		if (addDormitoryExtendRegistrationMutation.isPending) return
		try {
			const body: IAddDormitoryExtendRegistrationBody = {
				DormitoryRegistrationId: data.Id,
				StudentId: data.StudentId,
				DormitoryId: data.DormitoryId,
				DormitoryAreaId: data.DormitoryAreaId,
				DormitoryRoomId: data.DormitoryRoomId,
				ExtendDate: data.EndDate,
				Price: values.Price,
				Note: values.Note || ''
			}
			const result = await addDormitoryExtendRegistrationMutation.mutateAsync(body)
			ShowNoti('success', result?.data?.message)
			toggleModal()
		} catch (error) {
			ShowNoti('error', error?.message || 'Thêm gia hạn thất bại')
		}
	}

	return (
		<>
			<button onClick={showMoldal} type="button" className="flex w-full items-center gap-2.5 py-1 hover:text-tw-green">
				<MdOutlineAutorenew size={20} />
				<p>Gia hạn</p>
			</button>

			<MyModal
				open={isOpen}
				onCancel={toggleModal}
				title="Thêm gia hạn KTX"
				footer={
					<div className="flex gap-2 justify-center">
						<PrimaryButton onClick={toggleModal} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton
							loading={addDormitoryExtendRegistrationMutation.isPending}
							disable={addDormitoryExtendRegistrationMutation.isPending}
							onClick={() => form.submit()}
							background="primary"
							icon="save"
							type="button"
						>
							Lưu
						</PrimaryButton>
					</div>
				}
			>
				<div className="space-y-5 -mt-2.5">
					<div className="flex flex-col gap-y-1">
						<p className="font-semibold">Thông tin học viên</p>
						<ul className="list-disc ml-4 text-sm space-y-1">
							<li>Tên: {data.StudentName}</li>
							<li>Mã: {data.StudentCode}</li>
							<li>Ký túc xá: {data.DormitoryName}</li>
							<li>Phòng: {data.DormitoryRoomName}</li>
						</ul>
					</div>
					<MyForm form={form} onFinish={onSubmit}>
						<MyFormItem name="Month" label="Số tháng ở" rules={formRequired}>
							<MyInputNumber placeholder="chọn tháng" min={1} max={500} />
						</MyFormItem>
						<MyFormItem name="Price" label="Chi phí hàng tháng" rules={formRequired}>
							<MyInputNumber placeholder="Chi phí theo tháng" disabled={true} />
						</MyFormItem>
						<div className="mb-2">
							Tổng chi phí:{' '}
							<span className="font-semibold">
								{priceChange && monthChange ? Intl.NumberFormat('ja-JP').format(priceChange * monthChange) : 0} VND
							</span>
						</div>
						<MyFormItem name="Note" label="Ghi chú">
							<MyTextArea rows={3} placeholder="Mô tả" />
						</MyFormItem>
					</MyForm>
				</div>
			</MyModal>
		</>
	)
}
