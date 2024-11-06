import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import { StatisticClassNew } from '~/common/components/Dashboard/StatisticClassNew'

interface IClassNew {
	todoFeedback: any
}

export const ClassNew: React.FC<IClassNew> = ({ todoFeedback }) => {
	const [statisticialTestAppointment, setStatisticialTestAppointment] = useState([])

	const getStatisticialTestAppointment = async () => {
		try {
			const res = await staticsticalApi.getStatisticialTestAppointment(todoFeedback)
			if (res.status === 200) {
				setStatisticialTestAppointment(res.data.data)
			}
			if (res.status === 204) {
				setStatisticialTestAppointment([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getStatisticialTestAppointment()
	}, [todoFeedback])

	return (
		<MyStatisticCard title={'Kiểm tra đầu vào trong tháng'}>
			<StatisticClassNew data={statisticialTestAppointment} titleBar="Kiểm tra đầu vào trong tháng" type={2} />
		</MyStatisticCard>
	)
}
