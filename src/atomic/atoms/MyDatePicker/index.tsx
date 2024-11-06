import { DatePicker, DatePickerProps } from 'antd'
import React from 'react'

type TMyDatePicker = {} & DatePickerProps

const MyDatePicker: React.FC<TMyDatePicker> = (props) => {
	return <DatePicker className={props.className || 'h-[36px]'} {...props} />
}

export default MyDatePicker
