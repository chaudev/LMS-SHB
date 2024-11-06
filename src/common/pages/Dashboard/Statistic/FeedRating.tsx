import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
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
		<MyStatisticCard title={'Tỉ lệ đánh giá phản hồi'}>
			<StatisticPie data={statisticFeedRating} />
		</MyStatisticCard>
	)
}

export default FeedRating
