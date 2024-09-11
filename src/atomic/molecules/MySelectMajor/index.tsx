import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryMajors from '~/common/hooks/useQueryMajors'

type TMySelectMajor = TMySelectProps & {}

const MySelectMajor: React.FC<TMySelectMajor> = (props) => {
	const { data, isLoading } = useQueryMajors()

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn ngành học'}
			loading={isLoading}
			options={data?.data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectMajor
