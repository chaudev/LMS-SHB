import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { sampleTranscriptApi } from '~/api/grade-templates'

const useQuerySampleTranscript = () => {
	const data = useQuery({
		queryKey: ['get-all-sample-transcript'],
		queryFn: () => sampleTranscriptApi.getAll({ pageIndex: 1, pageSize: 99999 }).then((data) => data.data)
	})

	return { ...data, sampleTranscript: data.data }
}

export default useQuerySampleTranscript
