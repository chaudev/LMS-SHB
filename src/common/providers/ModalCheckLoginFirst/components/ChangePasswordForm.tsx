import { Form, Input, Modal } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { accountApi } from '~/api/user/user'

import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'
import { formRequired } from '~/common/libs/others/form'
import { useModalCheckLoginFirstContext } from '~/common/providers/ModalCheckLoginFirst'
import { CREATE_STUDENT_PASSWORD_DEFAULT } from '~/common/utils/constants'
import ResultSuccess from '~/common/providers/ModalCheckLoginFirst/components/ResultSuccess'

const delay = async (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

interface IChangePassword {
	OldPassword: string
	NewPassword: string
	ConfirmNewPassword: string
}

export default function ChangePasswordForm() {
	const { triggerModal, closeModal } = useModalCheckLoginFirstContext()
	const [form] = Form.useForm()
	const [isShowSuccess, setIsShowSuccess] = useState(false)

	const { data, isPending, mutateAsync } = useMutation({
		mutationFn: accountApi.changePassword
	})

	const handleChangePassWord = async (params: IChangePassword) => {
		if (isPending) return
		try {
			const result = await mutateAsync(params)
			if (result?.status === 200) {
				setIsShowSuccess(true)
				await delay(1000)
				closeModal()
				setIsShowSuccess(false)
			}
		} catch (error) {
			ShowNoti('error', error?.message)
		}
	}

	function onFinish(values) {
		const SUBMIT_DATA: IChangePassword = {
			OldPassword: CREATE_STUDENT_PASSWORD_DEFAULT,
			NewPassword: values.password,
			ConfirmNewPassword: values.confirmPassword
		}
		if (values.password.length < 6) {
			form.setFields([
				{
					name: 'password',
					errors: ['Mật khẩu phải nhiều hơn 5 ký tự']
				}
			])
			return false
		} else if (values.password !== values.confirmPassword) {
			form.setFields([
				{
					name: 'confirmPassword',
					errors: ['Mật khẩu nhập lại không đúng']
				}
			])
			return false
		} else if (values.password === CREATE_STUDENT_PASSWORD_DEFAULT) {
			form.setFields([
				{
					name: 'confirmPassword',
					errors: ['Không được đặt mật khẩu mới giống mật khẩu đã cấp']
				}
			])
			return false
		} else {
			handleChangePassWord(SUBMIT_DATA)
		}
	}
	return (
		<Modal
			open={Boolean(triggerModal)}
			closable={false}
			centered
			className="pb-0"
			footer={
				isShowSuccess
					? null
					: [
							<PrimaryButton
								loading={isPending}
								onClick={() => form.submit()}
								className="w-[50%]"
								type="button"
								background="blue"
								icon="save"
							>
								Lưu thay đổi
							</PrimaryButton>
					  ]
			}
		>
			<h2 className="font-semibold text-xl mb-2">Chào mừng bạn đến với SHD</h2>
			{isShowSuccess ? (
				<ResultSuccess message={data?.data?.message ?? 'Đổi mật khẩu thành công'} subTitle={'Chào mừng bạn đã đến với hệ thông SHD.'} />
			) : (
				<>
					<h3 className="pt-2 pb-4 text-tw-orange">Vui lòng cập nhật mật khẩu mới ở lần đăng nhập đầu tiên.</h3>
					<Form disabled={isPending} form={form} layout="vertical" onFinish={onFinish}>
						<div className="grid grid-cols-4 gap-x-4">
							<Form.Item className="col-span-4" label="Mật khẩu mới" name="password" rules={formRequired}>
								<Input.Password disabled={isPending} className="primary-input" />
							</Form.Item>
							<Form.Item className="col-span-4" label="Nhập lại mật khẩu mới" name="confirmPassword" rules={formRequired}>
								<Input.Password disabled={isPending} className="primary-input" />
							</Form.Item>
						</div>
					</Form>
				</>
			)}
		</Modal>
	)
}
