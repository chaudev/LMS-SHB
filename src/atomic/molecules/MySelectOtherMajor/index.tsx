import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryOtherMajor from '~/common/hooks/useQueryOtherMajor'

type TMySelectOtherMajor = {} & TMySelectProps

const MySelectOtherMajor: React.FC<TMySelectOtherMajor> = (props) => {
	const { data, isLoading } = useQueryOtherMajor()

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn ngành học khác'}
			loading={isLoading}
			options={data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectOtherMajor
