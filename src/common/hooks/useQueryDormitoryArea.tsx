import { useQuery } from '@tanstack/react-query'
import { dormitoryAreaApi } from '~/api/dormitory/dormitoryArea'

const useQueryDormitory = (visible?: boolean, DormitoryId?: number) => {
	const data = useQuery({
		queryKey: ['get-all-dormitory-area-by-id', [DormitoryId]],
		queryFn: () => dormitoryAreaApi.getAll({ PageIndex: 1, PageSize: 99999, DormitoryId }).then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryDormitory
