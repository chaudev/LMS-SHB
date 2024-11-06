import { Input, InputProps } from 'antd'
import React from 'react'
import styles from './styles.module.scss'

export type TMyInput = {
	size?: 'large'
	originalStyle?: boolean
} & InputProps

const SIZE = {
	large: styles.sizeLarge
}

const MyInput: React.FC<TMyInput> = (props) => {
	const { className = '', size, originalStyle = true, ...rest } = props
	if (originalStyle) {
		return <Input className={`primary-input`} {...rest} />
	}

	return <Input className={`${styles.wrapper} ${SIZE?.[size] || ''} ${className}`} {...rest} />
}

export default MyInput
