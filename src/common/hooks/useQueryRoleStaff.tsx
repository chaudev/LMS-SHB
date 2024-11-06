import { useQuery } from '@tanstack/react-query'
import { permissionApi } from '~/api/permission'

const useQueryRoleStaff = (visible?: boolean) => {
	const data = useQuery({
		queryKey: ['get-staff-role'],
		queryFn: () => permissionApi.getRoleStaff().then((data) => data.data.data)
	})

	return { ...data }
}

export default useQueryRoleStaff
