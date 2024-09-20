import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryStaffAvailable from '~/common/hooks/useQueryStaffAvailable'
import { parseSelectArrayUser } from '~/common/utils/common'

type TMySelectStaffAvailable = {} & TMySelectProps

const MySelectStaffAvailable: React.FC<TMySelectStaffAvailable> = (props) => {
	const { data, isLoading } = useQueryStaffAvailable(true)

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn nhân viên'}
			loading={isLoading}
			options={parseSelectArrayUser(data, 'FullName', 'UserCode', 'UserInformationId').map((item) => ({
				label: item.title,
				value: item.value
			}))}
			{...props}
		/>
	)
}

export default MySelectStaffAvailable
