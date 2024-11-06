import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { majorGroupApi } from '~/api/major-group'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import MajorGroupModal from './componets/MajorGroupModal'
import MajorGroupTable from './componets/MajorGroupTable'

const MajorGroup = () => {
	const router = useRouter()
	const { push, query } = router
	const userInformation = useSelector((state: RootState) => state.user.information)
	const isAllow = () => {
		if (checkIncludesRole(listPermissionsByRoles.config.programGroup.viewList, Number(userInformation?.RoleId))) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (!isAllow()) {
			router.push('/')
		}
	}, [])

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get/major-group'],
		queryFn: () => {
			return majorGroupApi
				.getAll({
					...query,
					pageSize: query.pageSize || PAGE_SIZE,
					pageIndex: query.pageIndex || 1
				})
				.then((data) => data.data)
		},
		enabled: router?.isReady && isAllow()
	})

	return (
		<div>
			{isAllow() && (
				<MajorGroupTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={
						checkIncludesRole(listPermissionsByRoles.config.programGroup.create, Number(userInformation?.RoleId)) ? (
							<MajorGroupModal refreshData={refetch} />
						) : undefined
					}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default MajorGroup
