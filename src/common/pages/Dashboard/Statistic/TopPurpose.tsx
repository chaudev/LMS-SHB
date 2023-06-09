import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import StatisticTop5Course from '~/common/components/Dashboard/StatisticTop5Course'

interface ITopPurpose {
	todoApi
}
const TopPurpose: React.FC<ITopPurpose> = ({ todoApi }) => {
	const [statisticTopPurpose, setStatisticTopPurpose] = useState([])
	const getTopPurpose = async () => {
		try {
			const res = await staticsticalApi.getTopPurpose(todoApi)
			console.log(res);
			console.log(todoApi);
			
			if (res.status === 200) {
				setStatisticTopPurpose(res.data.data)
			}
			if (res.status === 204) {
				setStatisticTopPurpose([])
			}
		} catch (error) {}
	}
	useEffect(() => {
		getTopPurpose()
	}, [todoApi])
	return (
		<Card title={<h1 className="text-2xl font-medium">Top 5 mục đích học</h1>}>
			<StatisticTop5Course data={statisticTopPurpose} titleBar="Mục đích học " type={2} />
		</Card>
	)
}

export default TopPurpose
