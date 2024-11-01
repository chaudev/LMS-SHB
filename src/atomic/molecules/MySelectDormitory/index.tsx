import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryDormitoryAll from '~/common/hooks/useQueryDormitoryAll'

type TMySelectDormitory = { enabledQuery?: boolean } & TMySelectProps

const MySelectDormitory: React.FC<TMySelectDormitory> = (props) => {
	const { data, isLoading } = useQueryDormitoryAll()

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn ký túc xá'}
			loading={isLoading}
			options={data?.data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectDormitory
