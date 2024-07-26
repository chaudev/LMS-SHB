import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { majorGroupApi } from '~/api/major-group'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import MajorGroupTable from './componets/MajorGroupTable'
import MajorGroupModal from './componets/MajorGroupModal'

const MajorGroup = () => {
	const router = useRouter()
	const { pageIndex } = router.query
	const { push, query } = router
	const DEFAULT_FILTER = { pageSize: PAGE_SIZE, pageIndex: 1 }
	const userInfo = useSelector((state: RootState) => state.user.information)
	const isAllow = () => {
		if (is(userInfo).admin) {
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
					Extra={<MajorGroupModal refreshData={refetch} />}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default MajorGroup
