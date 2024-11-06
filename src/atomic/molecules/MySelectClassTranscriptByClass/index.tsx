import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import styles from './styles.module.scss'
import useQueryClassTranscriptByClass from '~/common/hooks/useQueryClassTranscriptByClass'

type TMySelectClassTranscriptByClass = {
	classId: number
	isUseDebound?: boolean
} & TMySelectProps

const MySelectClassTranscriptByClass: React.FC<TMySelectClassTranscriptByClass> = (props) => {
	const { classId, isUseDebound, className, placeholder = 'Chọn bảng điểm', ...restProps } = props
	const { data, isLoading } = useQueryClassTranscriptByClass(classId, isUseDebound)

	return (
		<MySelect
			className={`${styles.wrapper} ${className}`}
			placeholder={placeholder}
			loading={isLoading}
			options={data?.map((item) => ({ label: item?.Name, value: item?.Id }))}
			{...restProps}
		/>
	)
}

export default MySelectClassTranscriptByClass
