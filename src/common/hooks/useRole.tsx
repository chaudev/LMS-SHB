import { useSelector } from 'react-redux'
import { RootState } from '~/store'

export const useRole = () => {
	const useInfomation = useSelector((state: RootState) => state.user.information)

	return {
		isAdmin: useInfomation.RoleId == 1,
		isTeacher: useInfomation.RoleId == 2,
		isStudent: useInfomation.RoleId == 3,
		isManager: useInfomation.RoleId == 4,
		isSaler: useInfomation.RoleId == 5,
		isAccountant: useInfomation.RoleId == 6,
		isAcademic: useInfomation.RoleId == 7,
		isParents: useInfomation.RoleId == 8
	}
}
