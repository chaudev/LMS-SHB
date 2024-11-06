import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
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
		<MyStatisticCard loading={loading} title={'Tổng số buổi học trong từng tháng'}>
			<StatisticRateTeacher data={statisticTotalScheduleStudent} titleBar="Buổi học trong từng tháng" type={1} />
		</MyStatisticCard>
	)
}

export default RateTeacher
