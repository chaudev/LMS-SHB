import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import { StatisticClassNew } from '~/common/components/Dashboard/StatisticClassNew'
import StatisticTop5Course from '~/common/components/Dashboard/StatisticTop5Course'

interface INewClass {
	todoApi
}
const NewClass: React.FC<INewClass> = ({ todoApi }) => {
	const [statisticNewClass, setStatisticNewClass] = useState([])
	const getNewClassInMonth = async () => {
		try {
			const res = await staticsticalApi.getNewClass(todoApi)
			if (res.status === 200) {
				setStatisticNewClass(res.data.data)
			}
			if (res.status === 204) {
				setStatisticNewClass([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getNewClassInMonth()
	}, [todoApi])
	return (
		<Card title={<h1 className="text-2xl font-medium">Lớp mới mỗi tháng</h1>}>
			<StatisticClassNew data={statisticNewClass} titleBar="Lớp mới mỗi tháng" type={1} />
		</Card>
	)
}

export default NewClass
