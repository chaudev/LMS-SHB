import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import StatisticTop5Course from '~/common/components/Dashboard/StatisticTop5Course'

const TopJob = ({ todoApi }) => {
	const [statisticTopJob, setStatisticTopJob] = useState([])
	const getTopJob = async () => {
		try {
			const res = await staticsticalApi.getTopJob(todoApi)
			if (res.status === 200) {
				setStatisticTopJob(res.data.data)
			}
			if (res.status === 204) {
				setStatisticTopJob([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getTopJob()
	}, [todoApi])

	return (
		<Card title={<h1 className="text-2xl font-medium">Top 5 công việc của học viên </h1>}>
			<StatisticTop5Course data={statisticTopJob} titleBar="Học viên " type={2} />
		</Card>
	)
}

export default TopJob
