import React, { FC, useEffect } from 'react'
import { Input, Form } from 'antd'
import { FiLogIn } from 'react-icons/fi'

export const LoadingSpin = () => {
	return (
		<svg className="animate-spin w-[15px] h-[15px] mr-[2px]" fill="none" viewBox="0 0 24 24">
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	)
}

type ILoginForm = {
	csrfToken?: string
	onSubmit: Function
	alloweRegisters?: boolean
	error?: string
	loading?: boolean
}

const LoginForm: FC<ILoginForm> = (props) => {
	const { loading = false, onSubmit, alloweRegisters = false, error, csrfToken } = props

	const [form] = Form.useForm()

	const _submit = async (data) => {
		if (!loading && onSubmit) {
			onSubmit(data)
		}
	}

	useEffect(() => {
		form.setFieldValue('username', null)
		form.setFieldValue('password', null)
	}, [])

	return (
		<Form autoComplete="on" initialValues={{ remember: true }} form={form} onFinish={_submit} className="w-100 login-forms ">
			<div className="login-form">
				<img className="logo-login" src="/logo/login-logo.png" alt="" />

				<h6 className="my-[24px] login-title">Đăng nhập</h6>
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<label>Tài khoản</label>
				<Form.Item name="username" rules={[{ required: true, message: 'Bạn không được để trống' }]}>
					<Input className="input" placeholder="Nhập tài khoản" prefix={<i className="fa fa-user" aria-hidden="true" />} />
				</Form.Item>
				<label className="password">Mật khẩu</label>
				<Form.Item name="password" rules={[{ required: true, message: 'Bạn không được để trống' }]}>
					<Input.Password
						className="input"
						type="password"
						prefix={<i className="fa fa-lock" aria-hidden="true" />}
						placeholder="Nhập mật khẩu"
					/>
				</Form.Item>

				{error && <div className="error-text mb-[-8px]">{error}</div>}

				<button disabled={loading} className="btn-login" type="submit">
					<div className="flex-shrink-0">Đăng nhập</div>
					{loading ? <LoadingSpin /> : <FiLogIn size={16} />}
				</button>

				{alloweRegisters && (
					<div className="mt-[16px] mb-[4px] register">
						Bạn chưa có tài khoản?{' '}
						<a className="underline" href="/register">
							Đăng ký
						</a>
					</div>
				)}

				<div className="wrap-password mt-3 w-full flex items-center justify-center font-[500]">
					<a className="underline" href="/fogot-password">
						Quên mật khẩu?
					</a>
				</div>
			</div>
		</Form>
	)
}

export default LoginForm
