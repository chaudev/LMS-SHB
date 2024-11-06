import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQuerySampleEvaluation from '~/common/hooks/useQuerySampleEvaluation'

export type TMySelectSampleEvaluation = {} & TMySelectProps

const MySelectSampleEvaluation: React.FC<TMySelectSampleEvaluation> = (props) => {
	const { ...rest } = props

	const { data, isLoading } = useQuerySampleEvaluation()

	return (
		<MySelect
			{...rest}
			disabled={isLoading}
			loading={isLoading}
			placeholder={props.placeholder || 'Chọn phiếu đánh giá'}
			options={data?.data?.map((item) => ({ label: item.Name, value: item.Id }))}
		/>
	)
}

export default MySelectSampleEvaluation
