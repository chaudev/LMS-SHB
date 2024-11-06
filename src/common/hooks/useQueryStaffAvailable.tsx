import { useQuery } from '@tanstack/react-query'
import { userInformationApi } from '~/api/user/user'

const useQueryStaffAvailable = (visible?: boolean) => {
	const data = useQuery({
		queryKey: [userInformationApi.keyGetStaffAvailable],
		queryFn: () => userInformationApi.getStaffAvailable().then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryStaffAvailable
