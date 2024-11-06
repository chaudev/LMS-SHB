import React, { useEffect } from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryClassTranscript from '~/common/hooks/useQueryClassTranscript'

export type TMySelectClassTranscript = {
	classId
	setSelectedClassTranscript?: Function
	isCreate?: boolean
	setIsCreate?: Function
} & TMySelectProps

const MySelectClassTranscript: React.FC<TMySelectClassTranscript> = (props) => {
	const { classId, setSelectedClassTranscript, isCreate, setIsCreate, ...rest } = props

	const { classTranscript, isLoading, isFetching } = useQueryClassTranscript(classId)

	useEffect(() => {
		if (classTranscript?.data?.length > 0 && isCreate && !isFetching) {
			!!setSelectedClassTranscript && setSelectedClassTranscript(classTranscript?.data[0])
			!!setIsCreate && setIsCreate(false)
		}
	}, [classTranscript?.data, isCreate, isFetching])

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
