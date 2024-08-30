import React, { useEffect, useState } from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import styles from './styles.module.scss'
import { Switch, SwitchProps } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import useQueryStudentInClass from '~/common/hooks/useQueryStudentInClass'

type TMySelectStudentInClasses = {
	classIds: string
	isUseDebound?: boolean
	switchProps?: SwitchProps
	onChangeOutside?: (value: number[], option: DefaultOptionType | DefaultOptionType[]) => void
	hasChooseAllButton?: boolean
} & TMySelectProps

const MySelectStudentInClasses: React.FC<TMySelectStudentInClasses> = (props) => {
	const {
		classIds,
		isUseDebound,
		className,
		placeholder = 'Chọn học viên',
		switchProps,
		onChangeOutside,
		hasChooseAllButton = false,
		...restProps
	} = props
	const { data, isLoading } = useQueryStudentInClass(classIds, isUseDebound)

	const [optionValue, setOptionValue] = useState<number[]>([])

	useEffect(() => {
		setOptionValue([])
		onChangeOutside?.([], [])
	}, [data])

	const onChange = (value: number[], option: DefaultOptionType | DefaultOptionType[]) => {
		setOptionValue(value)
		onChangeOutside?.(value, option)
	}

	return (
		<div className="relative">
			<MySelect
				className={`${styles.wrapper} ${className} relative`}
				placeholder={placeholder}
				loading={isLoading}
				options={data?.map((item) => ({ label: `[${item?.UserCode}] - ${item?.FullName}`, value: item?.UserInformationId }))}
				{...restProps}
				value={optionValue}
				onChange={onChange}
			/>
			{hasChooseAllButton && (
				<div className="absolute top-[-32px] right-0 flex items-center">
					<span className="mr-2">Chọn tất cả</span>
					<Switch
						checked={data?.length > 0 && optionValue?.length === data?.length}
						disabled={!data?.length || isLoading}
						onChange={(checked) => {
							if (checked) {
								setOptionValue(data?.map((item) => item.UserInformationId) || [])
							} else {
								setOptionValue([])
							}
						}}
						{...switchProps}
					/>
				</div>
			)}
		</div>
	)
}

export default MySelectStudentInClasses
