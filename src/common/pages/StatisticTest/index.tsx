import { useQuery } from '@tanstack/react-query'
import { Card } from 'antd'
import { useState } from 'react'
import StatisticTestHeader from './StatisticTestHeader'
import StatisticTestTable from './StatisticTestTable'
import { classTranscriptApi } from '~/api/class-transcript'

export type TStatisticTestParams = {
	branchIds?: string
	classIds?: string
	sampleTranscriptIds?: string
}

const StatisticTestPage = () => {
	const [params, setParams] = useState<TStatisticTestParams>({
		branchIds: undefined,
		classIds: undefined,
		sampleTranscriptIds: undefined
	})

	// ===== FETCH DATA =====
	const { data: reportData, isLoading: isLoadingReportData } = useQuery({
		queryKey: [classTranscriptApi.keyGetReport, [params?.branchIds, params?.classIds, params?.sampleTranscriptIds]],
		queryFn: () => {
			return classTranscriptApi.getReport({ ...params }).then((res) => res.data?.data)
		},
		enabled: !!params?.branchIds && !!params?.classIds
	})

	// ===== METHODS =====
	const onChangeParams = (newParams: TStatisticTestParams) => {
		setParams({ ...params, ...newParams })
	}

	return (
		<Card>
			<StatisticTestHeader params={params} onChangeParams={onChangeParams} isLoading={isLoadingReportData} />

			<hr />

			<StatisticTestTable reportData={reportData} loading={isLoadingReportData} />
		</Card>
	)
}

export default StatisticTestPage
