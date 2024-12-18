import { Form } from 'antd'
import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea'
import { ITextBoxField } from '../form-control'

export default function TextBoxField(props: ITextBoxField & TextAreaProps) {
	const {
		style,
		label,
		isRequired,
		className,
		allowClear,
		placeholder,
		disabled,
		name,
		rules,
		rows,
		maxLength,
		onChange,
		autoSize,
		...rest
	} = props
	return (
		<Form.Item name={name} style={style} label={label} className={`${className}`} required={isRequired} rules={rules}>
			<TextArea
				className={`${className} h-auto`}
				autoSize={autoSize}
				rows={rows || 4}
				allowClear={allowClear}
				placeholder={placeholder}
				disabled={disabled}
				onChange={(e) => !!onChange && onChange(e)}
				maxLength={maxLength}
				{...rest}
			/>
		</Form.Item>
	)
}
