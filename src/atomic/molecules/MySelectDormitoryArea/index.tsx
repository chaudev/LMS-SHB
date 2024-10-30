import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryDormitoryArea from '~/common/hooks/useQueryDormitoryArea'

type TMySelectDormitoryArea = {
	enabledQuery?: boolean
	DormitoryId?: number
} & TMySelectProps

const MySelectDormitoryArea: React.FC<TMySelectDormitoryArea> = (props) => {
	const { enabledQuery = true, DormitoryId, ...restProps } = props
	const { data, isLoading } = useQueryDormitoryArea(enabledQuery, DormitoryId)

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn khu'}
			loading={isLoading}
			options={data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectDormitoryArea
