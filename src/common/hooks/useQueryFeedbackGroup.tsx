import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { feedbackGroupApi } from '~/api/feedback-group/feedback-group'

const useQueryFeedbackGroup = () => {
	const data = useQuery({
		queryKey: ['Get/feedback-group'],
		queryFn: () => {
			return feedbackGroupApi
				.getAll({
					pageSize: 9999,
					pageIndex: 1
				})
				.then((data) => data.data)
		}
	})
	return { ...data }
}

export default useQueryFeedbackGroup
