import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import styles from './styles.module.scss'
import useQueryScheduleOfClass from '~/common/hooks/useQueryScheduleOfClass'
import moment from 'moment'

type TMySelectScheduleOfClass = {
	classId: number
	isUseDebound?: boolean
} & TMySelectProps

const MySelectScheduleOfClass: React.FC<TMySelectScheduleOfClass> = (props) => {
	const { classId, isUseDebound, className, placeholder = 'Chọn buổi học', ...restProps } = props
	const { data, isLoading } = useQueryScheduleOfClass(classId, isUseDebound)

	return (
		<MySelect
			className={`${styles.wrapper} ${className}`}
			placeholder={placeholder}
			loading={isLoading}
			options={data?.map((item, index) => ({
				label: `[Buổi ${index + 1}][${moment(item?.StartTime).format('DD/MM')}] ${moment(item?.StartTime).format('HH:mm')} - ${moment(
					item?.EndTime
				).format('HH:mm')}`,
				value: item?.Id
			}))}
			{...restProps}
		/>
	)
}

export default MySelectScheduleOfClass
