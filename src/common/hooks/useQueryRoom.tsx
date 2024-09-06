import { useQuery } from '@tanstack/react-query'
import { roomApi } from '~/api/room'

const useQueryRoom = (visible?: boolean, branchId?: number) => {
	const data = useQuery({
		queryKey: ['get-all-room', [branchId]],
		queryFn: () => roomApi.getAll({ pageIndex: 1, pageSize: 99999, branchId }).then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryRoom
