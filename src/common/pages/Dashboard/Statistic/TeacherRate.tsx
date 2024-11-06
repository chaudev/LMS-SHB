import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import StatisticPieRateTeacher from '~/common/components/Dashboard/StatisticPieRateTeacher'

interface ITeacherRate {
	todoApi: any
}
const TeacherRate: React.FC<ITeacherRate> = ({ todoApi }) => {
	const [statisticTeacherRate, setStatisticTeacherRate] = useState([])
	const getTeacherRate = async () => {
		try {
			const res = await staticsticalApi.getRateTeacher(todoApi)
			if (res.status === 200) {
				setStatisticTeacherRate(res.data.data)
			}
			if (res.status === 204) {
				setStatisticTeacherRate([])
			}
		} catch (error) {}
	}
	useEffect(() => {
		getTeacherRate()
	}, [todoApi])
	return (
		<MyStatisticCard title={'Tỉ lệ đánh giá'}>
			<StatisticPieRateTeacher data={statisticTeacherRate} />
		</MyStatisticCard>
	)
}

export default TeacherRate
