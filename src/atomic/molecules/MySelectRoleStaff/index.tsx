import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryAllBranch from '~/common/hooks/useQueryAllBranch'
import useQueryRoleStaff from '~/common/hooks/useQueryRoleStaff'
import { USER_ROLES } from '~/common/utils/constants'

type TMySelectRoleStaff = {} & TMySelectProps

const MySelectRoleStaff: React.FC<TMySelectRoleStaff> = (props) => {
	const { data, isLoading } = useQueryRoleStaff()

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn chức vụ'}
			loading={isLoading}
			disabled={isLoading}
			options={data
				?.filter((role) => role?.Id !== USER_ROLES.admin && role.Id !== USER_ROLES.manager)
				?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectRoleStaff
