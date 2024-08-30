import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import MajorContractsTable from './ContractsTable'
import { templateMajorApi } from '~/api/template-major'
import PrimaryButton from '~/common/components/Primary/Button'

const MajorContractsPage = () => {
	const router = useRouter()
	const { push, query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)

	const isAllow = useMemo(() => {
		if (is(userInfo).admin) {
			return true
		}
		return false
	}, [userInfo])

	useEffect(() => {
		if (!isAllow) {
			router.push('/')
		}
	}, [isAllow])

	const { data, isLoading, refetch } = useQuery({
		queryKey: [templateMajorApi.keyGetAll, [query?.id, query?.pageSize, query?.pageIndex]],
		queryFn: () => {
			return templateMajorApi
				.getAll({
					...query,
					majorId: Number(query?.id),
					pageSize: Number(query?.pageSize) || PAGE_SIZE,
					pageIndex: Number(query?.pageIndex) || 1
				})
				.then((data) => data.data)
		},
		enabled: !!query?.id && isAllow
	})

	if (!isAllow) return <></>

	return (
		<div>
			<MajorContractsTable
				total={data?.totalRow || 0}
				loading={isLoading}
				onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
				Extra={
					<PrimaryButton
						background="green"
						type="button"
						icon="add"
						onClick={() => {
							router.push({
								pathname: '/majors/contracts/create',
								query: {
									majorId: query?.id
								}
							})
						}}
					>
						Thêm mới
					</PrimaryButton>
				}
				data={data?.data || []}
				refreshData={refetch}
			/>
		</div>
	)
}

export default MajorContractsPage
