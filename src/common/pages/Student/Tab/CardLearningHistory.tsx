import { Card, Empty, Skeleton, Timeline } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BsClockHistory } from 'react-icons/bs'
import { learningHistoryApi } from '~/api/learning-history'
import { ShowNostis } from '~/common/utils'

interface ICardLearningHistory {
	majorsId: number
	studentId: number
	panels: number[]
}

const CardLearningHistory: React.FC<ICardLearningHistory> = ({ majorsId, studentId, panels }) => {
	const [learningHistorys, setLearningHistorys] = useState<ILearningHistory[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const getLearningHistory = async () => {
		try {
			setLoading(true)
			const params = {
				majorsRegistrationId: Number(majorsId),
				studentId: studentId,
				pageSize: 9999,
				pageIndex: 1
			}
			const ressponse = await learningHistoryApi.getAllLearningHistory(params)

			if (ressponse.status === 200) {
				setLearningHistorys(ressponse.data.data)
			}
			setLoading(false)
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!!majorsId && panels && panels.includes(majorsId)) {
			getLearningHistory()
		}
	}, [majorsId, panels])

	if (loading) {
		return <Skeleton />
	}
	return (
		<Card title="Lịch sử học tập">
			{learningHistorys && learningHistorys.length > 0 ? (
				<Timeline className="p-3">
					{learningHistorys.map((item) => {
						return (
							<Timeline.Item color="blue" key={item.Id} dot={<BsClockHistory size={22} />}>
								<Card >
									<Card.Meta
										description={
											<div className="d-flex flex-col gap-3  radius-lg">
												<span className={`text-base	text-[#1890ff]`}>{moment(item.CreatedOn).format('HH:MM DD/MM/YYYY')}</span>
												<span className={``}>{item.Description}</span>
											</div>
										}
									></Card.Meta>
								</Card>
							</Timeline.Item>
						)
					})}
				</Timeline>
			) : (
				<Empty />
			)}
		</Card>
	)
}

export default CardLearningHistory
