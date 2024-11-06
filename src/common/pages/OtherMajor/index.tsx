import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { otherMajorApi } from '~/api/other-major'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import OtherMajorModal from './componets/OtherMajorModal'
import OtherMajorTable from './componets/OtherMajorTable'

const OtherMajor = () => {
	const router = useRouter()
	const { push, query } = router
	const userInformation = useSelector((state: RootState) => state.user.information)

	const isAllow = useMemo(() => {
		if (checkIncludesRole(listPermissionsByRoles.config.otherMajor.viewList, Number(userInformation?.RoleId))) {
			return true
		}
		return false
	}, [userInformation])

	useEffect(() => {
		if (!isAllow) {
			router.push('/')
		}
	}, [isAllow])

	const { data, isLoading, refetch } = useQuery({
		queryKey: [otherMajorApi.keyGetAll, [query?.pageSize, query?.pageIndex]],
		queryFn: () => {
			return otherMajorApi
				.getAll({
					...query,
					pageSize: Number(query?.pageSize) || PAGE_SIZE,
					pageIndex: Number(query?.pageIndex) || 1
				})
				.then((data) => data.data)
		},
		enabled: router?.isReady && isAllow
	})

	return (
		<div>
			{isAllow && (
				<OtherMajorTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={
						checkIncludesRole(listPermissionsByRoles.config.otherMajor.create, Number(userInformation?.RoleId)) ? (
							<OtherMajorModal refreshData={refetch} />
						) : undefined
					}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default OtherMajor
