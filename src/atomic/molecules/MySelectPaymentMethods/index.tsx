import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryPaymentMethodAll from '~/common/hooks/useQueryPaymentMethod'

type TMySelectDormitory = {} & TMySelectProps

const MySelectPaymentMethods: React.FC<TMySelectDormitory> = (props) => {
	const { data, isLoading } = useQueryPaymentMethodAll()

	return (
		<MySelect
			className={props.className || 'h-[36px] w-full'}
			placeholder={props.placeholder || 'Chọn phương thức thanh toán'}
			loading={isLoading}
			options={data?.data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...props}
		/>
	)
}

export default MySelectPaymentMethods
