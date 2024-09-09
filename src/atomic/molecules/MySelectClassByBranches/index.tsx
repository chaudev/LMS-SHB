import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryClassByBranch from '~/common/hooks/useQueryClassByBranch'
import styles from './styles.module.scss'

type TMySelectClassByBranches = {
	branchIds: string
	classStatus?: string
	isUseDebound?: boolean
} & TMySelectProps

const MySelectClassByBranches: React.FC<TMySelectClassByBranches> = (props) => {
	const { branchIds, classStatus, isUseDebound, className, placeholder = 'Chọn lớp học', ...restProps } = props
	const { data, isLoading } = useQueryClassByBranch(branchIds, classStatus, isUseDebound)

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

export default MySelectClassByBranches
