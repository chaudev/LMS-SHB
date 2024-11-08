import { Form } from 'antd'
import React, { useEffect, useState } from 'react'

import MyForm from '~/atomic/atoms/MyForm'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyModal from '~/atomic/atoms/MyModal'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectWarningLevel from '~/atomic/molecules/MySelectWarningLevel'

import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'

interface ModalUpdateAndCreateProps {
	handleUpdate: (v: TUpdateDormitoryWarning, handleToggleModal: () => void) => void
	data: TDormitoryWarningRules
}

export default function ModalUpdateAndCreate({ handleUpdate, data }: ModalUpdateAndCreateProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isLoading, setIsloading] = useState(false)

	const [form] = Form.useForm()

	const handleToggleModal = () => setIsOpen(!isOpen)

	const openModal = () => setIsOpen(true)

	useEffect(() => {
		if (data) {
			form.setFieldsValue({
				WarningLevel: data.WarningLevel,
				Note: data.Note
			})
		}
	}, [data, form, isOpen])

	const onSubmit = async (values: TUpdateDormitoryWarning) => {
		setIsloading(true)
		const body = {
			Id: data.Id,
			ModifiedOn: data.ModifiedOn,
			DormitoryId: data.DormitoryId,
			DormitoryAreaId: data.DormitoryAreaId,
			DormitoryRoomId: data.DormitoryRoomId,
			...values
		}
		try {
			await handleUpdate(body, handleToggleModal)
			setIsloading(false)
		} finally {
			setIsloading(false)
		}
	}
	return (
		<>
			<IconButton color="green" type="button" icon={'edit'} tooltip={'edit'} onClick={openModal} />
			<MyModal
				centered
				open={isOpen}
				onCancel={handleToggleModal}
				footer={
					<div className="flex gap-2 justify-center">
						<PrimaryButton onClick={handleToggleModal} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton
							loading={isLoading}
							disable={isLoading}
							onClick={() => form.submit()}
							background="primary"
							icon="save"
							type="button"
						>
							Tạo
						</PrimaryButton>
					</div>
				}
				title={`Chỉnh sửa danh sách vi phạm`}
			>
				<div className="space-y-4 -mt-2.5">
					<div className="flex flex-col gap-y-1">
						<p className="font-semibold">Thông tin học viên</p>
						<ul className="list-disc ml-4 text-sm space-y-1">
							<li>Tên: {data.FullName}</li>
							<li>Mã: {data.UserCode}</li>
							<li>Ký túc xá: {data.DormitoryName}</li>
							<li>Phòng: {data.DormitoryRoomName}</li>
						</ul>
					</div>
					<MyForm form={form} layout="vertical" onFinish={onSubmit}>
						<MyFormItem name="WarningLevel" rules={formRequired} label="Chọn mức độ vi phạm">
							<MySelectWarningLevel />
						</MyFormItem>
						<MyFormItem name="Note" rules={formRequired} label="Nhập nội dung vi phạm">
							<MyTextArea placeholder="Nội dung vi phạm" />
						</MyFormItem>
					</MyForm>
				</div>
			</MyModal>
		</>
	)
}
