import React, { useState } from 'react'
import ForeignLanguageStatistic from './components/ForeignLanguageStatistic'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MyDatePicker from '~/atomic/atoms/MyDatePicker'
import VisaStatusStatistic from './components/VisaStatus'
import ProfileStatusStatistic from './components/ProfileStatus'
import ProcessStatistic from './components/Process'

const StatisticProfile = () => {
	const [selectedBranch, setSelectedBranch] = useState(null)
	const [selectedYear, setSelectedYear] = useState(null)
	return (
		<div className="grid grid-cols-12 gap-2">
			<div className="col-span-12 grid grid-cols-6 gap-2">
				<div className="w500:col-span-2 col-span-3">
					<MySelectBranch onChange={(e) => setSelectedBranch(e)} />
				</div>
				<div className="w500:col-span-2 col-span-3">
					<MyDatePicker
						className="w-full h-[36px] primary-input"
						onChange={(date: any, dateString: string) => {
							setSelectedYear(Number(dateString))
						}}
						picker="year"
						placeholder="Chọn năm"
					/>
				</div>
			</div>
			<div className="col-span-12">
				<ForeignLanguageStatistic branchId={selectedBranch} year={selectedYear} />
			</div>

			<div className="col-span-12">
				<VisaStatusStatistic branchId={selectedBranch} year={selectedYear} />
			</div>
			<div className="col-span-12">
				<ProcessStatistic branchId={selectedBranch} year={selectedYear} />
			</div>
			<div className="col-span-12">
				<ProfileStatusStatistic branchId={selectedBranch} year={selectedYear} />
			</div>
		</div>
	)
}

export default StatisticProfile
