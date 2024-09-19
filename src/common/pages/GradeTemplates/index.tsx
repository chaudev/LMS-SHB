import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { sampleTranscriptApi } from '~/api/grade-templates'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { checkIncludesRole, is } from '~/common/utils/common'
import { RootState } from '~/store'
import SampleTranscriptTable from './components/SampleTranscriptTable'
import SampleTranscriptModal from './components/SampleTranscriptModal'
import { ShowErrorToast } from '~/common/utils/main-function'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

const GradeTemplatesPage = () => {
	const router = useRouter()
	const { push, query } = router
	const userInformation = useSelector((state: RootState) => state.user.information)
	const isAllow = () => {
		if (checkIncludesRole(listPermissionsByRoles.config.sampleTranscript.viewList, Number(userInformation?.RoleId))) {
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
		queryKey: ['Get/SampleTranscript', query],
		queryFn: () => {
			return sampleTranscriptApi
				.getAll({
					...query,
					pageSize: query.pageSize || PAGE_SIZE,
					pageIndex: query.pageIndex || 1
				})
				.then((data) => data.data)
				.catch((error) => {
					ShowErrorToast(error)
					throw error
				})
		},
		enabled: router?.isReady && isAllow()
	})

	return (
		<div>
			{isAllow() && (
				<SampleTranscriptTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={
						checkIncludesRole(listPermissionsByRoles.config.sampleTranscript.create, Number(userInformation?.RoleId)) ? (
							<SampleTranscriptModal refreshData={refetch} />
						) : undefined
					}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default GradeTemplatesPage
