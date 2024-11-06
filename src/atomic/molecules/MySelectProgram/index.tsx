import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryProgram from '~/common/hooks/useQueryProgram'

type TMySelectProgram = {} & TMySelectProps

const MySelectProgram: React.FC<TMySelectProgram> = (props) => {
	const { data, isLoading } = useQueryProgram(true)

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn khóa'}
			loading={isLoading}
			options={data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectProgram
