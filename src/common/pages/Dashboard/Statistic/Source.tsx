import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import StatisticTop5Course from '~/common/components/Dashboard/StatisticTop5Course'

const Source = ({ todoApi }) => {
	const [statisticSource, setStatisticSource] = useState([])
	const getTopSource = async () => {
		try {
			const res = await staticsticalApi.getTopSource(todoApi)
			if (res.status === 200) {
				setStatisticSource(res.data.data)
			}
			if (res.status === 204) {
				setStatisticSource([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getTopSource()
	}, [todoApi])
	return (
		<Card title={<h1 className="text-2xl font-medium">Top 5 nguồn khách hàng</h1>}>
			<StatisticTop5Course data={statisticSource} titleBar="Khách hàng" type={2} />
		</Card>
	)
}
export default Source