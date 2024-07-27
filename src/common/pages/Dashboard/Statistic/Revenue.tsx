import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import StatisticPositiveAndNegativeChart from '~/common/components/Dashboard/StatisticPositiveAndNegativeChart'

interface IClassNew {
	todoApi: any
}

const Revenue: React.FC<IClassNew> = ({ todoApi }) => {
	const [statisticRevenue, setStatisticRevenue] = useState<IStatisticTopCourse[]>([])
	const getRevenue = async () => {
		try {
			const res = await staticsticalApi.getRevenue(todoApi)
			if (res.status === 200) {
				setStatisticRevenue(res.data.data)
			}
			if (res.status === 204) {
				setStatisticRevenue([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getRevenue()
	}, [todoApi])
	return (
		<MyStatisticCard title={'Doanh Thu'}>
			<StatisticPositiveAndNegativeChart data={statisticRevenue} titleBar="Doanh thu" />
		</MyStatisticCard>
	)
}

export default Revenue
