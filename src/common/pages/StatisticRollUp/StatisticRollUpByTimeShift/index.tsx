import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import StatisticRollUpByTimeShiftHeader from './StatisticRollUpByTimeShiftHeader'
import StatisticRollUpByTimeShiftTable from './StatisticRollUpByTimeShiftTable'
import moment from 'moment'
import { rollUpApi } from '~/api/rollup'

const PAGE_SIZE = 30

export type TStatisticRollUpByTimeShiftParams = {
	date?: string
	branchIds?: string
	search?: string
	pageSize: number
	pageIndex: number
}

const StatisticRollUpByTimeShift = () => {
	const [params, setParams] = useState<TStatisticRollUpByTimeShiftParams>({
		branchIds: undefined,
		date: moment().format('DD/MM/YYYY'),
		search: '',
		pageSize: PAGE_SIZE,
		pageIndex: 1
	})

	// ===== FETCH DATA =====
	const dependencies = [params?.branchIds, params?.date, params?.search, params?.pageIndex]
	const { data: reportData, isLoading: isLoadingReportData } = useQuery({
		queryKey: [rollUpApi.keyGetAssessmentAttendance, dependencies],
		queryFn: () => {
			return rollUpApi
				.getAssessmentAttendance({ ...params, date: params?.date ? moment(params?.date, 'DD/MM/YYYY').format('YYYY/MM/DD') : undefined })
				.then((res) => res.data)
		},
		enabled: !!params?.date
	})

	// ===== METHODS =====
	const onChangeParams = (newParams: TStatisticRollUpByTimeShiftParams) => {
		setParams({ ...params, ...newParams })
	}

	return (
		<>
			<StatisticRollUpByTimeShiftHeader params={params} onChangeParams={onChangeParams} isLoading={isLoadingReportData} />

			<hr />

			<StatisticRollUpByTimeShiftTable
				reportData={reportData?.data || []}
				loading={isLoadingReportData}
				pagination={{
					pageSize: params.pageSize,
					total: reportData?.totalRow || 0,
					current: params.pageIndex,
					showTotal: () => reportData?.totalRow > 0 && <div className="font-weight-black">Tổng cộng: {reportData.totalRow}</div>,
					onChange: (pageNumber, pageSize) => setParams({ ...params, pageIndex: pageNumber, pageSize })
				}}
			/>
		</>
	)
}

export default StatisticRollUpByTimeShift
