import { useQuery } from '@tanstack/react-query'
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import StatisticTop5Course from '~/common/components/Dashboard/StatisticTop5Course'

interface IClassNew {
	todoApi: any
}
const TopLearning: React.FC<IClassNew> = ({ todoApi }) => {
	const [statisticTopLearning, setStatisticTopLearning] = useState<IStatisticTopCourse[]>([])

	// const getTopLearningNeed = async () => {
	// 	try {
	// 		const res = await staticsticalApi.getTopLearningNeed(todoApi)
	// 		if (res.status === 200) {
	// 			setStatisticTopLearning(res.data.data)
	// 		}
	// 		if (res.status === 204) {
	// 			setStatisticTopLearning([])
	// 		}
	// 	} catch (error) {}
	// }

	// useEffect(() => {
	// 	getTopLearningNeed()
	// }, [todoApi])

	const { data, isLoading } = useQuery({
		queryKey: ['get/statis-top-learning', todoApi],
		queryFn: () => {
			return staticsticalApi.getTopLearningNeed(todoApi).then((data) => data.data)
		},
		enabled: !!todoApi
	})

	return (
		<MyStatisticCard title={'Top 5 nhu cầu học'}>
			<StatisticTop5Course loading={isLoading} data={data?.data || []} titleBar="Nhu cầu học" type={1} />
		</MyStatisticCard>
	)
}

export default TopLearning
