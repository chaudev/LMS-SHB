import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import { StatisticRateTeacher } from '~/common/components/Dashboard/StatisticRateTeacher'

const TotalScheduleTeacher = ({ todoApi }) => {
	const [statisticTotalScheduleTeacher, setStatisticTotalScheduleTeacher] = useState([])
	const getTotalScheduleTeacher = async () => {
		try {
			const res = await staticsticalApi.getTotalScheduleTeacher(todoApi)
			if (res.status === 200) {
				setStatisticTotalScheduleTeacher(res.data.data)
			}
			if (res.status === 204) {
				setStatisticTotalScheduleTeacher([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getTotalScheduleTeacher()
	}, [todoApi])
	return (
		<Card title={<h1 className="text-2xl font-medium">Tổng số buổi dạy trong từng tháng</h1>}>
			<StatisticRateTeacher data={statisticTotalScheduleTeacher} titleBar="Buổi dạy trong từng tháng" type={1} />
		</Card>
	)
}

export default TotalScheduleTeacher
