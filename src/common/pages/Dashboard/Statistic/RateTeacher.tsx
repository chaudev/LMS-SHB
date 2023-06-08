import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import { StatisticRateTeacher } from '~/common/components/Dashboard/StatisticRateTeacher'

interface IRateTeacher {
	todoApi: any
}
const RateTeacher: React.FC<IRateTeacher> = ({ todoApi }) => {
	const [loading, setLoading] = useState(false)
	const [statisticTotalScheduleStudent, setStatisticTotalScheduleStudent] = useState([])
	const getTotalScheduleStudent = async () => {
		try {
			setLoading(true)
			const res = await staticsticalApi.getTotalScheduleStudent(todoApi)

			if (res.status === 200) {
				setStatisticTotalScheduleStudent(res.data.data)
			}
			if (res.status === 204) {
				setStatisticTotalScheduleStudent([])
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}
	useEffect(() => {
		getTotalScheduleStudent()
	}, [todoApi])
	return (
		<Card loading={loading} title={<h1 className="text-2xl font-medium">Tổng số buổi học trong từng tháng</h1>}>
			<StatisticRateTeacher data={statisticTotalScheduleStudent} titleBar="Buổi học trong từng tháng" type={1} />
		</Card>
	)
}

export default RateTeacher