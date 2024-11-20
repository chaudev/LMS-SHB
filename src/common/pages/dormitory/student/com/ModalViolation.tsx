import React, { useState } from 'react'
import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'

import dormitoryWarningApi from '~/api/dormitory/dormitory-warning'

import MyForm from '~/atomic/atoms/MyForm'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyModal from '~/atomic/atoms/MyModal'
import MyTextArea from '~/atomic/atoms/MyTextArea'

import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowErrorToast } from '~/common/utils/main-function'
import { ShowNoti } from '~/common/utils'
import MySelectWarningLevel from '~/atomic/molecules/MySelectWarningLevel'
import { RiErrorWarningLine } from 'react-icons/ri'

interface ModalViolationProps {
	data: TDormitoryItem
}

type FormData = {
	WarningLevel: 'Nhe' | 'Vua' | 'Nghiemtrong'
	Note: string
}

export default function ModalViolation({ data }: ModalViolationProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [form] = Form.useForm<FormData>()

	const createDormitoryWarningMutation = useMutation({
		mutationFn: dormitoryWarningApi.createDormitoryWarning
	})

	const onSubmit = async (values: FormData) => {
		try {
			if (createDormitoryWarningMutation.isPending || !data) return
			const body = {
				UserId: data.StudentId,
				DormitoryId: data.DormitoryId,
				DormitoryAreaId: data.DormitoryAreaId,
				DormitoryRoomId: data.DormitoryRoomId,
				...values
			} as TCreacteDormitoryWarningBody
			const result = await createDormitoryWarningMutation.mutateAsync(body)
			ShowNoti('success', result?.data?.message)
			handleResetAndToggleModal()
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	const showMoldal = () => setIsOpen(true)

	const handleResetAndToggleModal = () => {
		setIsOpen(!open)
		form.resetFields()
	}

	return (
		<>
			{/* <IconButton color="green" type="button" icon={'add'} tooltip={'Thêm vi phạm'} onClick={showMoldal} /> */}
			<button onClick={showMoldal} type="button" className="flex items-center gap-2.5 py-1 hover:text-tw-green">
				<RiErrorWarningLine size={20} />
				<p>Thêm vi phạm</p>
			</button>
			<MyModal
				open={isOpen}
				onCancel={handleResetAndToggleModal}
				title="Thêm vi phạm của học viên"
				footer={
					<div className="flex gap-2 justify-center">
						<PrimaryButton onClick={handleResetAndToggleModal} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton
							disable={createDormitoryWarningMutation.isPending}
							loading={createDormitoryWarningMutation.isPending}
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
				<div className="space-y-4 -mt-2.5">
					<div className="flex flex-col gap-y-1">
						<p className="font-semibold">Thông tin học viên</p>
						<ul className="list-disc ml-4 text-sm space-y-1">
							<li>Tên: {data.StudentName}</li>
							<li>Mã: {data.StudentCode}</li>
							<li>Ký túc xá: {data.DormitoryName}</li>
							<li>Phòng: {data.DormitoryRoomName}</li>
						</ul>
					</div>
					<MyForm form={form} layout="vertical" onFinish={onSubmit} className="flex flex-col gap-2">
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
