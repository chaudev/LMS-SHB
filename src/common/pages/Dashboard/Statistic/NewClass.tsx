import { useQuery } from '@tanstack/react-query'
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import { StatisticClassNew } from '~/common/components/Dashboard/StatisticClassNew'
import StatisticTop5Course from '~/common/components/Dashboard/StatisticTop5Course'

interface INewClass {
	todoApi
}
const NewClass: React.FC<INewClass> = ({ todoApi }) => {
	const [statisticNewClass, setStatisticNewClass] = useState([])
	// const getNewClassInMonth = async () => {
	// 	try {
	// 		const res = await staticsticalApi.getNewClass(todoApi)
	// 		if (res.status === 200) {
	// 			setStatisticNewClass(res.data.data)
	// 		}
	// 		if (res.status === 204) {
	// 			setStatisticNewClass([])
	// 		}
	// 	} catch (error) {}
	// }

	// useEffect(() => {
	// 	getNewClassInMonth()
	// }, [todoApi])

	const { data, isLoading } = useQuery({
		queryKey: ['get/statis-new-class', todoApi],
		queryFn: () => {
			return staticsticalApi.getNewClass(todoApi).then((data) => data.data)
		},
		enabled: !!todoApi
	})

	return (
		<MyStatisticCard title={'Lớp mới mỗi tháng'}>
			<StatisticClassNew loading={isLoading} data={data?.data || []} titleBar="Lớp mới mỗi tháng" type={1} />
		</MyStatisticCard>
	)
}

export default NewClass
