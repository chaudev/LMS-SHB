import moment from 'moment'
import React from 'react'
import { MySelectDormitory } from '~/atomic'
import MyDatePicker from '~/atomic/atoms/MyDatePicker'

interface FilterDormitoryHeaderProps {
	setStartDate: (v: string) => void
	setEndDate: (v: string) => void
	setSelect: (v: string) => void
}

export default function FilterDormitoryHeader({ setEndDate, setStartDate, setSelect }: FilterDormitoryHeaderProps) {
	return (
		<div className="flex items-center gap-4">
			<div>
				<label className="font-medium mb-[6px] mr-2">Lọc:</label>
				<MyDatePicker
					picker="month"
					placeholder="chọn tháng"
					disabledDate={(currentDate) => currentDate && currentDate > moment().endOf('day')}
					format={'MM/YYYY'}
					onChange={(value) => {
						if (value) {
							const startOfMonth = value.startOf('month').format('YYYY-MM-DD HH:mm')
							const endOfMonth = value.endOf('month').format('YYYY-MM-DD HH:mm')
							setStartDate(startOfMonth)
							setEndDate(endOfMonth)
						} else {
							setStartDate('')
							setEndDate('')
						}
					}}
				/>
			</div>
			<div>
				<MySelectDormitory
					onChange={(_, item: { label: string }) => {
						if (item) {
							setSelect(item.label)
						} else {
							setSelect('')
						}
					}}
				/>
			</div>
		</div>
	)
}
