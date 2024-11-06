import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryDormitoryRoom from '~/common/hooks/useQueryDormitoryRoom'

type TMySelectDormitoryRoom = {
	enabledQuery?: boolean
	DormitoryId?: number;
	DormitoryAreaId?: number;
} & TMySelectProps

const MySelectDormitoryRoom: React.FC<TMySelectDormitoryRoom> = (props) => {
	const { enabledQuery = true, DormitoryId, DormitoryAreaId, ...restProps } = props
	const { data, isLoading } = useQueryDormitoryRoom(enabledQuery, DormitoryId, DormitoryAreaId)

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn phòng'}
			loading={isLoading}
			options={data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectDormitoryRoom
