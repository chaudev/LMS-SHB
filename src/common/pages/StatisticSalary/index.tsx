import React from 'react'
import TotalSalary12Months from './components/TotalSalary12Months'
import TotalSalaryByTeacher from './components/TotalSalaryByTeacher'

const StatisticSalary = () => {
	return (
		<>
			<div className="mb-2">
				<TotalSalary12Months />
			</div>
			<div className="mb-2">
				<TotalSalaryByTeacher />
			</div>
		</>
	)
}

export default StatisticSalary
