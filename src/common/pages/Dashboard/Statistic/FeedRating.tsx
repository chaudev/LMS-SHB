import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import StatisticPie from '~/common/components/Dashboard/StatisticPie'

const FeedRating = ({ todoApi }) => {
	const [statisticFeedRating, setStatisticFeedRating] = useState([])

	const getFeedbackRating = async () => {
		try {
			const res = await staticsticalApi.getFeedBackRating(todoApi)
			if (res.status === 200) {
				setStatisticFeedRating(res.data.data)
			}
			if (res.status === 204) {
				setStatisticFeedRating([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getFeedbackRating()
	}, [todoApi])
	return (
		<Card title={<h1 className="text-2xl font-medium">Tỉ lệ đánh giá phản hồi</h1>}>
			<StatisticPie data={statisticFeedRating} />
		</Card>
	)
}

export default FeedRating
