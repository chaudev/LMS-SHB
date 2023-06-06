import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import StatisticStudentByAge from '~/common/components/Dashboard/StatisticStudentByAge'

const StudentAge = ({ todoApi }) => {
	const [statisticStudentAge, setStatisticStudentAge] = useState([])

	const getStaticStudentAge = async () => {
		try {
			const res = await staticsticalApi.getStudentAge(todoApi)
			if (res.status === 200) {
				setStatisticStudentAge(res.data.data)
			}
			if (res.status === 204) {
				setStatisticStudentAge([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getStaticStudentAge()
	}, [todoApi])

	return (
		<Card  title={<h1 className="text-2xl font-medium">Thống kê học viên theo độ tuổi</h1>}>
			<StatisticStudentByAge data={statisticStudentAge} titleBar="Độ tuổi học viên " />
		</Card>
	)
}

export default StudentAge
