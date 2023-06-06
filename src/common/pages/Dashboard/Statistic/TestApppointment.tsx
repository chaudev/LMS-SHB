import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
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
		<Card title={<h1 className="text-2xl font-medium">Kiểm tra đầu vào trong tháng</h1>}>
			<StatisticClassNew data={statisticialTestAppointment} titleBar="Kiểm tra đầu vào trong tháng" type={2} />
		</Card>
	)
}
