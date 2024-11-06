import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { feedbackGroupApi } from '~/api/feedback-group/feedback-group'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { ShowErrorToast } from '~/common/utils/main-function'
import { RootState } from '~/store'
import FeedbackGroupModal from './components/FeedbackGroupModal'
import FeedbackGroupTable from './components/FeedbackGroupTable'

const FeedbackGroup = () => {
	const router = useRouter()
	const { push, query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
	const isAllow = () => {
		if (checkIncludesRole(listPermissionsByRoles.feedback.group.viewList, Number(userInfo?.RoleId))) {
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
		queryKey: ['Get/feedback-group', query],
		queryFn: () => {
			return feedbackGroupApi
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
				<FeedbackGroupTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={
						checkIncludesRole(listPermissionsByRoles.feedback.group.create, Number(userInfo?.RoleId)) ? (
							<FeedbackGroupModal refreshData={refetch} />
						) : undefined
					}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default FeedbackGroup
