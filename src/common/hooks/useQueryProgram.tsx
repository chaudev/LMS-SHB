import { useQuery } from '@tanstack/react-query'
import { programApi } from '~/api/program'

const useQueryProgram = (visible?: boolean) => {
	const data = useQuery({
		queryKey: ['get-all-program'],
		queryFn: () => programApi.getAll({ pageIndex: 1, pageSize: 99999 }).then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryProgram
