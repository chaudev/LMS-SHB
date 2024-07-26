import { Form, FormItemProps } from 'antd'
import React from 'react'
import styles from './styles.module.scss'

type TMyFormItem = {
	className?: string
	originalStyle?: boolean
} & Omit<FormItemProps, 'colon'>

const MyFormItem: React.FC<TMyFormItem> = (props) => {
	const { className = '', originalStyle = true, children, ...rest } = props
	if (originalStyle) {
		return <Form.Item {...props} />
	}
	return (
		<Form.Item colon={false} className={`${styles.wrapper} ${className}`} labelAlign="left" {...rest}>
			{children}
		</Form.Item>
	)
}

export default MyFormItem
