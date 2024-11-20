import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { dormitoryRegisterApi } from '~/api/dormitory/dormitory-register'
import MySelect, { type TMySelectProps } from '~/atomic/atoms/MySelect'

type TMySelectUserAvailable = {} & TMySelectProps

export default function SelectUserRegisterDormitory(props: TMySelectUserAvailable) {
	const { onChange, ...restProps } = props
	const { data, isPending } = useQuery({
		queryKey: ['dormitory-registration-available-student'],
		queryFn: dormitoryRegisterApi.getDormitoryRegistrationAvailableStudent,
		select: (data) => {
			const result = data?.data?.data
			return result.map((item) => ({ label: item.FullName, value: item.UserInformationId })) || []
		}
	})
	return (
		<MySelect
			className={props?.className || 'h-[36px] w-full'}
			placeholder={props?.placeholder || ''}
			loading={isPending}
			options={data}
			onChange={onChange}
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
