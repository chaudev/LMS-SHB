import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryUserAvailable from '~/common/hooks/useQueryUserAvailable'
import { parseSelectArrayUser } from '~/common/utils/common'

type TMySelectUserAvailable = { roleId: number; branchId?: number } & TMySelectProps

const MySelectUserAvailable: React.FC<TMySelectUserAvailable> = (props) => {
	const { branchId, roleId, ...restProps } = props
	const { data, isLoading } = useQueryUserAvailable(roleId, branchId)

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || ''}
			loading={isLoading}
			options={parseSelectArrayUser(data, 'FullName', 'UserCode', 'UserInformationId').map((item) => ({
				label: item.title,
				value: item.value
			}))}
			{...restProps}
		/>
	)
}

export default MySelectUserAvailable
