import { Form, Input } from 'antd'
import React from 'react'
import { IFormInputText } from '../form-control'

const InputTextField = (props: IFormInputText) => {
	const { style, label, hidden, isRequired, className, allowClear, placeholder, disabled, name, rules, onChange, value, suffix } = props
	return (
		<Form.Item name={name} style={style} label={label} className={`${className}`} required={isRequired} rules={rules} hidden={hidden}>
			<Input
				className={`primary-input ${className}`}
				allowClear={allowClear}
				placeholder={placeholder}
				disabled={disabled}
				onChange={(e) => {
					onChange && onChange(e)
				}}
				value={value}
				defaultValue={value}
				suffix={suffix}
			/>
		</Form.Item>
	)
}

export default InputTextField
