import React, { useState } from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import { EFeedbackType } from '~/enums'

type TMySelectFeedbackGroup = {} & TMySelectProps

const feedbackTypeOptions = [
	{ label: 'Khác', value: EFeedbackType.Other },
	{ label: 'Ký túc xá', value: EFeedbackType.Dormitory },
]

export const MySelectFeedbackType: React.FC<TMySelectFeedbackGroup> = (props) => {
	const [options] = useState(feedbackTypeOptions)
	return (
		<MySelect
			defaultValue={options[0].value}
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn loại phản hồi'}
			options={options}
			allowClear={false}
			{...props}
		/>
	)
}

