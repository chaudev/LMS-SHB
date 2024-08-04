import { TextAreaProps } from 'antd/lib/input'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import styles from './styles.module.scss'

type TMyTextArea = { originalStyle?: boolean; size?: 'large' } & TextAreaProps

const SIZE = {
	large: styles.sizeLarge
}

const MyTextArea: React.FC<TMyTextArea> = (props) => {
	const { className = '', size, originalStyle = true, ...rest } = props
	if (originalStyle) {
		return <TextArea {...rest} />
	}

	return <TextArea className={`${styles.wrapper}  ${SIZE?.[size] || ''} ${className}`} {...rest} />
}

export default MyTextArea
