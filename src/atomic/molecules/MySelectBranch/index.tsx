import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryAllBranch from '~/common/hooks/useQueryAllBranch'

type TMySelectBranch = {} & TMySelectProps

const MySelectBranch: React.FC<TMySelectBranch> = (props) => {
	const { data, isLoading } = useQueryAllBranch()

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn trung tâm'}
			loading={isLoading}
			options={data?.data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectBranch
