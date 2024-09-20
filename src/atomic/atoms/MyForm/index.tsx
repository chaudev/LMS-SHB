import { Form } from 'antd'
import { FormProps } from 'antd/es/form'
import React from 'react'

export type TMyFormProps = {} & FormProps

const MyForm: React.FC<TMyFormProps> = (props) => {
	const { children, ...rest } = props
	return (
		<Form scrollToFirstError layout="vertical" {...rest}>
			{children as any}
		</Form>
	)
}

export default MyForm
