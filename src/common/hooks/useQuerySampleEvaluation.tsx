import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { evaluationApi } from '~/api/evaluation'

const useQuerySampleEvaluation = () => {
	const data = useQuery({
		queryKey: ['get-all-sample-evaluation'],
		queryFn: () => evaluationApi.getAllForm({ pageIndex: 1, pageSize: 9999 }).then((data) => data.data),
		staleTime: 5 * 60 * 1000
	})

	return { ...data }
}

export default useQuerySampleEvaluation
