import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryClassTranscript from '~/common/hooks/useQueryClassTranscript'

export type TMySelectClassTranscript = {
	classId
} & TMySelectProps

const MySelectClassTranscript: React.FC<TMySelectClassTranscript> = (props) => {
	const { classId, ...rest } = props

	const { classTranscript, isLoading } = useQueryClassTranscript(classId)

	return (
		<MySelect
			{...rest}
			disabled={isLoading}
			loading={isLoading}
			options={classTranscript?.data?.map((item) => ({ label: item.Name, value: item.Id, obj: item }))}
		/>
	)
}

export default MySelectClassTranscript
