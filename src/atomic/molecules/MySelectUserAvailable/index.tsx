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
			filterOption={(input, option) => {
				const label = typeof option?.label === 'string' ? option.label : ''
				return label.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}}
			filterSort={(optionA, optionB) => {
				const labelA = typeof optionA?.label === 'string' ? optionA.label : ''
				const labelB = typeof optionB?.label === 'string' ? optionB.label : ''
				return labelA.toLowerCase().localeCompare(labelB.toLowerCase())
			}}
			{...restProps}
		/>
	)
}

export default MySelectUserAvailable
