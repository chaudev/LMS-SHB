import React from 'react'
import StudentByOffice from './ByOffice'
import StudentByClass from './ByClass'
import ByLevel from './ByLevel'

const DashboardStudents = () => {
	return (
		<div className="grid grid-cols-4 tablet:grid-cols-12 laptop:grid-cols-12, gap-4 w-full">
			<StudentByOffice />
			<StudentByClass />
			<ByLevel />
		</div>
	)
}

export default DashboardStudents
