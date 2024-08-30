import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryClassByBranch from '~/common/hooks/useQueryClassByBranch'
import styles from './styles.module.scss'

type TMySelectClassByBranches = {
	branchIds: string
	isUseDebound?: boolean
} & TMySelectProps

const MySelectClassByBranches: React.FC<TMySelectClassByBranches> = (props) => {
	const { branchIds, isUseDebound, className, placeholder = 'Chọn lớp học', ...restProps } = props
	const { data, isLoading } = useQueryClassByBranch(branchIds, isUseDebound)

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
