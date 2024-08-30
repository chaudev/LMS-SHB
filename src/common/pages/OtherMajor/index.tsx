import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import OtherMajorTable from './componets/OtherMajorTable'
import OtherMajorModal from './componets/OtherMajorModal'
import { otherMajorApi } from '~/api/other-major'

const OtherMajor = () => {
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
					Extra={<OtherMajorModal refreshData={refetch} />}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default OtherMajor
