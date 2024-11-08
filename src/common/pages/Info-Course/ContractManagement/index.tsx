import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { contractApi } from '~/api/contract'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { checkIncludesRole, is } from '~/common/utils/common'
import { RootState } from '~/store'
import ContractTable from './components/ContractTable'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

const ContractManagement = () => {
	const [pageFilter, setPageFilter] = useState({ pageIndex: 1, pageSize: PAGE_SIZE, search: '', majorId: undefined, studentId: undefined })
	const router = useRouter()

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['get/all-contract', pageFilter],
		queryFn: () => {
			return contractApi.getAll({ ...pageFilter }).then((res) => res.data)
		}
	})
	const userInfo = useSelector((state: RootState) => state.user.information)
	const isAllow = () => {
		if (checkIncludesRole(listPermissionsByRoles.admissions.contract.viewList, Number(userInfo?.RoleId))) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (!isAllow()) {
			router.push('/')
		}
	}, [])

	return (
		<div>
			{checkIncludesRole(listPermissionsByRoles.admissions.contract.viewList, Number(userInfo?.RoleId)) && (
				<ContractTable
					total={data?.totalRow || 0}
					loading={isLoading || isFetching}
					onChangePage={(pageIndex) => setPageFilter({ ...pageFilter, pageIndex: pageIndex })}
					// Extra={<ContractModal refreshData={refetch} />}
					data={data?.data || []}
					refreshData={refetch}
					isCanEdit={is(userInfo).admin}
				/>
			)}
		</div>
	)
}

export default ContractManagement
