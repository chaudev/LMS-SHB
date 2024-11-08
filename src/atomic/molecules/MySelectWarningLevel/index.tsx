import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'

const options = [
	{ label: 'Nhẹ', value: 'Nhe' },
	{ label: 'Vừa', value: 'Vua' },
	{ label: 'Nghiêm trọng', value: 'Nghiemtrong' }
]

export default function MySelectWarningLevel(props: TMySelectProps) {
	return (
		<MySelect
			className={props.className || ''}
			placeholder={props.placeholder || 'Chọn mức độ vị phạm'}
			options={options}
			allowClear
			filterOption={(input, option) => (option?.value as string).toLowerCase().includes(input.toLowerCase())}
			{...props}
		/>
	)
}
