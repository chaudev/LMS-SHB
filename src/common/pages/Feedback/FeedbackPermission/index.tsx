import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { feedbackPermissionApi } from '~/api/feedback-permission'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import FeedbackPermissionTable from './components/FeedbackPermissionTable'
import FeedbackPermissionModal from './components/FeedbackPermissionModal'
import { ShowErrorToast } from '~/common/utils/main-function'

const FeedbackPermission = () => {
	const router = useRouter()
	const { push, query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
	const isAllow = () => {
		if (is(userInfo).admin || is(userInfo).manager) {
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
		queryKey: ['Get/feedback-permission', query],
		queryFn: () => {
			return feedbackPermissionApi
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
				<FeedbackPermissionTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={<FeedbackPermissionModal refreshData={refetch} />}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default FeedbackPermission