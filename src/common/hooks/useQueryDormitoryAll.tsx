import { useQuery } from '@tanstack/react-query'
import { dormitoryApi } from '~/api/dormitory/dormitory'

const useQueryDormitoryAll = () => {
	const data = useQuery({
		queryKey: ['get-all-dormitory'],
		queryFn: () =>
			dormitoryApi
				.getAll({
					PageIndex: 1,
					PageSize: 9999,
					Search: ' '
				})
				.then((data) => data.data),
		staleTime: 5 * 60 * 1000
	})

	return { ...data }
}

export default useQueryDormitoryAll
