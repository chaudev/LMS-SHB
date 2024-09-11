import { useQuery } from '@tanstack/react-query'
import { Card } from 'antd'
import { useState } from 'react'
import StatisticAttendanceHeader from './StatisticAttendanceHeader'
import StatisticAttendanceTable from './StatisticAttendanceTable'
import { classApi } from '~/api/class'

export type TStatisticAttendanceParams = {
	branchIds: string
	classIds: string
}

const StatisticAttendancePage = () => {
	const [params, setParams] = useState<TStatisticAttendanceParams>({
		branchIds: undefined,
		classIds: undefined
	})

	// ===== FETCH DATA =====
	const { data: reportData, isLoading: isLoadingReportData } = useQuery({
		queryKey: [classApi.keyGetClassStudentAttendanceRate, [params?.branchIds, params?.classIds]],
		queryFn: () => {
			return classApi.getClassStudentAttendanceRate({ ...params }).then((res) => res.data?.data)
		},
		enabled: !!params?.branchIds && !!params?.classIds
	})

	// ===== METHODS =====
	const onChangeParams = (newParams: TStatisticAttendanceParams) => {
		setParams({ ...params, ...newParams })
	}

	return (
		<>
			<p className="font-medium text-[18px] mb-[16px]">Thống kê chuyên cần của học viên</p>

			<Card>
				<StatisticAttendanceHeader params={params} onChangeParams={onChangeParams} isLoading={isLoadingReportData} />

				<hr />

				<StatisticAttendanceTable reportData={reportData || []} loading={isLoadingReportData} />
			</Card>
		</>
	)
}

export default StatisticAttendancePage
