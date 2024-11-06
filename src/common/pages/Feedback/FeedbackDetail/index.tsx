import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { feedbackApi } from '~/api/feedback-list'
import FeedbackContent from './FeedbackContent'

const FeedbackDetail = () => {
	const router = useRouter()
	const { push, query } = router
	const { id } = query

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['get/feedback-detail', query],
		queryFn: () => {
			return feedbackApi.getDetail(id).then((data) => data.data)
		},
		enabled: !!id && router.isReady
	})

	return (
		<div className="flex w1000:flex-row flex-col gap-4 feedback-container">
			<FeedbackContent loading={isLoading} data={data?.data} onRefresh={refetch} />
			{/* <FeedbackUser loading={isLoading} data={data} onRefresh={refetch} /> */}
		</div>
	)
}

export default FeedbackDetail
