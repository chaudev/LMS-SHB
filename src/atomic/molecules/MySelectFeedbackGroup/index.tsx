import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryFeedbackGroup from '~/common/hooks/useQueryFeedbackGroup'

type TMySelectFeedbackGroup = {} & TMySelectProps

const MySelectFeedbackGroup: React.FC<TMySelectFeedbackGroup> = (props) => {
	const { data, isLoading } = useQueryFeedbackGroup()
	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn nhóm phản hồi'}
			loading={isLoading}
			disabled={isLoading}
			options={data?.data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectFeedbackGroup
