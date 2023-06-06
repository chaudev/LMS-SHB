import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import StatisticTop5Course from '~/common/components/Dashboard/StatisticTop5Course'

interface IClassNew {
	todoApi: any
}
const TopLearning: React.FC<IClassNew> = ({ todoApi }) => {
	const [statisticTopLearning, setStatisticTopLearning] = useState<IStatisticTopCourse[]>([])
	
	const getTopLearningNeed = async () => {
		try {
			const res = await staticsticalApi.getTopLearningNeed(todoApi)
			if (res.status === 200) {
				setStatisticTopLearning(res.data.data)
			}
			if (res.status === 204) {
				setStatisticTopLearning([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getTopLearningNeed()
	}, [todoApi])

	return (
		<Card title={<h1 className="text-2xl font-medium">Top 5 nhu cầu học</h1>}>
			<StatisticTop5Course data={statisticTopLearning} titleBar="Nhu cầu học" type={1} />
		</Card>
	)
}

export default TopLearning
