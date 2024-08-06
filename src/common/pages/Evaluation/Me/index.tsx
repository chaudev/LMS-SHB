import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { userEvaluationFormApi } from '~/api/user-evaluation'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowErrorToast } from '~/common/utils/main-function'
import MyEvaluationListTable from './components/MyEvaluationListTable'

const MyEvaluationList = () => {
	const router = useRouter()
	const { pageIndex } = router.query
	const { push, query } = router

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-my-evaluation-list', query],
		queryFn: () => {
			return userEvaluationFormApi
				.getMe({
					...query,
					pageSize: Number(query.pageSize) || PAGE_SIZE,
					pageIndex: Number(query.pageIndex) || 1
				})
				.then((data) => data.data)
				.catch((error) => {
					ShowErrorToast(error)
					throw error
				})
		},
		enabled: router?.isReady
	})

	return (
		<div>
			<MyEvaluationListTable
				total={data?.totalRow || 0}
				loading={isLoading}
				onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
				data={data?.data || []}
			/>
		</div>
	)
}

export default MyEvaluationList
