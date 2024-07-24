import { Input, InputProps } from 'antd'
import React from 'react'

type TMyInput = {} & InputProps

const MyInput: React.FC<TMyInput> = (props) => {
	return <Input {...props} className={`primary-input ${props.className}`} />
}

export default MyInput
