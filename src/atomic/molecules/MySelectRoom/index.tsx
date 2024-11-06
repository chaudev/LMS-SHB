import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryRoom from '~/common/hooks/useQueryRoom'

type TMySelectRoom = {
	enabledQuery?: boolean
	branchId?: number
} & TMySelectProps

const MySelectRoom: React.FC<TMySelectRoom> = (props) => {
	const { enabledQuery = true, branchId, ...restProps } = props
	const { data, isLoading } = useQueryRoom(enabledQuery, branchId)

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

export default MySelectRoom
