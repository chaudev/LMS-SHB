import { useQuery } from '@tanstack/react-query'
import { dormitoryRoomApi } from '~/api/dormitory/dormitoryRoom'

const useQueryDormitoryRoom = (visible?: boolean, DormitoryId?: number, DormitoryAreaId?: number) => {
	const data = useQuery({
		queryKey: ['get-all-dormitory-rooom-by-id', [DormitoryId, DormitoryAreaId]],
		queryFn: () => dormitoryRoomApi.getAll({ PageIndex: 1, PageSize: 99999, DormitoryId, DormitoryAreaId }).then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryDormitoryRoom
