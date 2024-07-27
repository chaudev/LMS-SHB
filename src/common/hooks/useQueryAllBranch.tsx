import { useQuery } from '@tanstack/react-query'
import { branchApi } from '~/api/branch'

const useQueryAllBranch = () => {
	const data = useQuery({
		queryKey: ['get-all-branch'],
		queryFn: () => branchApi.getAll().then((data) => data.data),
		staleTime: 5 * 60 * 1000
	})

	return { ...data }
}

export default useQueryAllBranch
