import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import { dayOfWeek } from '~/common/utils/constants'

type TMySelectDateOfWeek = {  } & TMySelectProps

const MySelectDateOfWeek: React.FC<TMySelectDateOfWeek> = (props) => {

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn thứ'}
			options={dayOfWeek.map((item) => ({
				label: item.title,
				value: item.value
			}))}
			{...props}
		/>
	)
}

export default MySelectDateOfWeek
