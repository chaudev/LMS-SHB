import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { evaluationTimeApi } from '~/api/evaluation-time'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import useQueryAllBranch from '~/common/hooks/useQueryAllBranch'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { ShowErrorToast } from '~/common/utils/main-function'
import { RootState } from '~/store'
import EvaluationTimeForm from './components/EvaluationForm'
import EvaluationTimeTable from './components/EvaluationTimeTable'

const EvaluationTime = () => {
	const router = useRouter()
	const { pageIndex } = router.query
	const { push, query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
	const { data: branch } = useQueryAllBranch()
	const isAllow = () => {
		if (checkIncludesRole(listPermissionsByRoles.evaluation.listEvaluationRounds.viewList, Number(userInfo?.RoleId))) {
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
		queryKey: ['get-evaluation-time-list', query],
		queryFn: () => {
			return evaluationTimeApi
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
				<EvaluationTimeTable
					totalPage={data?.totalRow || 0}
					currentPage={Number(query.pageIndex) || 1}
					pageSize={PAGE_SIZE}
					loading={isLoading}
					getPagination={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={
						checkIncludesRole(listPermissionsByRoles.evaluation.listEvaluationRounds.create, Number(userInfo?.RoleId)) ? (
							<EvaluationTimeForm refreshData={refetch} />
						) : undefined
					}
					data={data?.data || []}
					refreshData={refetch}
					TitleCard={
						<div>
							<FilterBaseVer2
								dataFilter={[
									{
										name: 'branchIds',
										title: 'Trung tâm',
										type: 'select',
										col: 'col-span-2',
										optionList: branch?.data?.map((item) => ({
											title: item.Name,
											value: item?.Id
										}))
									}
								]}
								handleFilter={(values) => {
									router.push({ query: { ...query, ...values, pageIndex: 1 } })
								}}
								handleReset={(value) => {
									router.push({ query: { ...query, branchIds: null } })
								}}
							/>
						</div>
					}
				/>
			)}
		</div>
	)
}

export default EvaluationTime
