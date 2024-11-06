import React, { useMemo } from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import useQueryClassByBranch from '~/common/hooks/useQueryClassByBranch'
import styles from './styles.module.scss'

type TMySelectClassByBranches = {
	branchIds: string
	classStatus?: string
	isUseDebound?: boolean
	isHaveBranchCode?: boolean
} & TMySelectProps

const MySelectClassByBranches: React.FC<TMySelectClassByBranches> = (props) => {
	const { branchIds, classStatus, isUseDebound, isHaveBranchCode, className, placeholder = 'Chọn lớp học', ...restProps } = props
	const { data, isLoading } = useQueryClassByBranch(branchIds, classStatus, isUseDebound)

	const dataOptions = useMemo(() => {
		if (Array.isArray(data)) {
			if (isHaveBranchCode) {
				return data?.map((item) => ({ label: `[${item?.BranchCode}] - ${item?.Name}`, value: item?.Id }))
			} else {
				return data?.map((item) => ({ label: item?.Name, value: item?.Id }))
			}
		}
		return []
	}, [isHaveBranchCode, data])

	return (
		<MySelect
			className={`${styles.wrapper} ${className}`}
			placeholder={placeholder}
			loading={isLoading}
			options={dataOptions}
			{...restProps}
		/>
	)
}

export default MySelectClassByBranches
