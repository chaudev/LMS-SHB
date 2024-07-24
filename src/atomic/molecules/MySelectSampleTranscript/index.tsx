import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQuerySampleTranscript from '~/common/hooks/useQuerySampleTranscript'

export type TMySelectSampleTranscript = {} & TMySelectProps

const MySelectSampleTranscript: React.FC<TMySelectSampleTranscript> = (props) => {
	const { ...rest } = props

	const { sampleTranscript, isLoading } = useQuerySampleTranscript()

	return (
		<MySelect
			{...rest}
			disabled={isLoading}
			loading={isLoading}
			options={sampleTranscript?.data?.map((item) => ({ label: item.Name, value: item.Id }))}
		/>
	)
}

export default MySelectSampleTranscript
