import { useQuery } from '@tanstack/react-query'
import { majorsApi } from '~/api/majors/majors'

const useQueryMajors = () => {
	const data = useQuery({
		queryKey: [majorsApi.keyGetAll],
		queryFn: () => majorsApi.getAll({ pageIndex: 1, pageSize: 9999 }).then((data) => data.data),
	})

	return { ...data, classTranscript: data.data }
}

export default useQueryMajors
