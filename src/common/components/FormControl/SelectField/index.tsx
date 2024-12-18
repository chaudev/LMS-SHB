import { Form, Select } from 'antd'
import React from 'react'
import { IFormSelectField } from '../form-control'

const SelectField = (props: IFormSelectField) => {
	const {
		style,
		label,
		onChangeSelect,
		optionList,
		isRequired,
		className,
		placeholder,
		disabled,
		name,
		rules,
		mode,
		isLoading,
		suffix,
		allowClear = true,
		hidden = false,
		max
	} = props
	const { Option } = Select

	const checkOnChangeSelect = (value) => {
		if (!onChangeSelect) return
		onChangeSelect(value)
	}

	return (
		<Form.Item name={name} style={style} label={label} className={`${className}`} hidden={hidden} required={isRequired} rules={rules}>
			<Select
				mode={mode}
				className={`primary-input ${className}`}
				showSearch
				showArrow
				allowClear={allowClear}
				loading={isLoading}
				style={style}
				placeholder={placeholder}
				optionFilterProp="children"
				suffixIcon={suffix}
				disabled={disabled}
				onChange={(value) => {
					checkOnChangeSelect(value)
				}}
				maxTagCount={max}
			>
				{optionList &&
					optionList.map((o, idx) => (
						<Option disabled={disabled || o.disabled} key={idx} value={o.value}>
							{o.title}
						</Option>
					))}
			</Select>
		</Form.Item>
	)
}

export default SelectField
