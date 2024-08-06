import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { evaluationApi } from '~/api/evaluation'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { ShowErrorToast } from '~/common/utils/main-function'
import { RootState } from '~/store'
import EvaluationListTable from './components/EvaluationListTable'
import EvaluationForm from './components/EvaluationForm'
import MyInputSearch from '~/atomic/atoms/MyInputSearch'

const EvaluationList = () => {
	const router = useRouter()
	const { pageIndex } = router.query
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
		queryKey: ['get-evaluation-list', query],
		queryFn: () => {
			return evaluationApi
				.getAllForm({
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
				<EvaluationListTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={<EvaluationForm refreshData={refetch} />}
					TitleCard={
						<div className="w-[300px]">
							<MyInputSearch onSearch={(e) => router.push({ query: { ...query, pageIndex: 1, search: e } })} />
						</div>
					}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default EvaluationList
