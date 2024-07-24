import { useQuery } from '@tanstack/react-query'
import { classTranscriptApi } from '~/api/class-transcript'

const useQueryClassTranscript = (classId) => {
	const data = useQuery({
		queryKey: ['get-all-transcript', classId],
		queryFn: () => classTranscriptApi.getAll({ pageIndex: 1, pageSize: 99999, classId: classId }).then((data) => data.data),
		enabled: !!classId
	})

	return { ...data, classTranscript: data.data }
}

export default useQueryClassTranscript
