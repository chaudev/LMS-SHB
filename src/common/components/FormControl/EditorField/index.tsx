import { Form } from 'antd'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { IEditorField } from '../form-control'

const DynamicComponentWithNoSSR = dynamic(() => import('./Editor'), {
	ssr: false
})

function EditorField(props: IEditorField) {
	// Phải thêm onchangeEditor để set value form
	const {
		label,
		name,
		isRequired,
		disabled,
		rules,
		initialValue,
		placeholder,
		customFieldProps,
		onChangeEditor,
		disableButton,
		id,
		height,
		allowPasteImage
	} = props
	const [value, setValue] = useState('')

	const checkHandleChange = (value) => {
		if (!onChangeEditor) return
		onChangeEditor(value)
		setValue(value)
	}

	return (
		<Form.Item name={name} required={isRequired} rules={rules} label={label}>
			<DynamicComponentWithNoSSR
				initialValue={initialValue}
				value={value}
				placeholder={placeholder}
				handleChangeDataEditor={checkHandleChange}
				customFieldProps={customFieldProps}
				disabled={disabled}
				disableButton={disableButton}
				id={id}
				height={height}
				allowPasteImage={allowPasteImage}
			/>
		</Form.Item>
	)
}

export default EditorField
