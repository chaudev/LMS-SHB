import { useQuery } from '@tanstack/react-query'
import { debounceV2 } from '../utils/common'
import { useEffect, useState } from 'react'
import { classTranscriptApi } from '~/api/class-transcript'

const debounce = debounceV2(800)

const useQueryClassTranscriptByClass = (classId: number, isUseDebound?: boolean) => {
	const [params, setParams] = useState({
		classId: undefined
	})

	useEffect(() => {
		if (isUseDebound) {
			debounce(() => setParams({ classId }))
		} else {
			setParams({ classId })
		}
	}, [classId, isUseDebound])

	const data = useQuery({
		queryKey: [classTranscriptApi.keyGetDropdown, [params.classId]],
		queryFn: () => classTranscriptApi.getDropdown(params.classId).then((data) => data.data.data),
		enabled: !!params.classId
	})

	return { ...data }
}

export default useQueryClassTranscriptByClass
