import { useQuery } from '@tanstack/react-query'
import { userInformationApi } from '~/api/user/user'

const useQueryUserAvailable = (roleId: number, branchId?: number) => {
	const data = useQuery({
		queryKey: [userInformationApi.keyGetAllUserAvailable, [branchId]],
		queryFn: () =>
			userInformationApi
				.getAllUserAvailable({ roleId: `${roleId}`, branchId: branchId ? `${branchId}` : undefined })
				.then((res) => res.data.data),
		enabled: !!roleId
	})

	return { ...data }
}

export default useQueryUserAvailable
