import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { sampleTranscriptApi } from '~/api/grade-templates'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import SampleTranscriptTable from './components/SampleTranscriptTable'
import SampleTranscriptModal from './components/SampleTranscriptModal'

const GradeTemplatesPage = () => {
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
		queryKey: ['Get/SampleTranscript'],
		queryFn: () => {
			return sampleTranscriptApi
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
				<SampleTranscriptTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					Extra={<SampleTranscriptModal refreshData={refetch} />}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default GradeTemplatesPage
