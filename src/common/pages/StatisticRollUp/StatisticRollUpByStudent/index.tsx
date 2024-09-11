import { useState } from 'react'
import { rollUpApi } from '~/api/rollup'
import { useQuery } from '@tanstack/react-query'
import styles from './styles.module.scss'
import StatisticRollUpByStudentHeader from './StatisticRollUpByStudentHeader'
import StatisticRollUpByStudentNote from './StatisticRollUpByStudentNote'
import StatisticRollUpByStudentTable from './StatisticRollUpByStudentTable'
import moment from 'moment'

export type TStatisticRollUpByStudentParams = {
	branchIds?: string
	classIds?: string
	from?: string
	to?: string
}

const StatisticRollUpByStudent = () => {
	const [params, setParams] = useState<TStatisticRollUpByStudentParams>({
		branchIds: undefined,
		classIds: undefined,
		from: undefined,
		to: undefined
	})

	// ===== FETCH DATA =====
	const { data: reportData, isLoading: isLoadingReportData } = useQuery({
		queryKey: [rollUpApi.keyGetReport, [params?.branchIds, params?.classIds, params?.from, params?.to]],
		queryFn: () => {
			return rollUpApi
				.getReport({
					...params,
					from: params?.from ? moment(params?.from, 'DD/MM/YYYY').format('YYYY/MM/DD') : undefined,
					to: params?.to ? moment(params?.to, 'DD/MM/YYYY').format('YYYY/MM/DD') : undefined
				})
				.then((res) => res.data?.data)
		},
		enabled: !!params?.branchIds && !!params?.classIds
	})

	// ===== METHODS =====
	const onChangeParams = (newParams: TStatisticRollUpByStudentParams) => {
		setParams({ ...params, ...newParams })
	}

	return (
		<>
			<StatisticRollUpByStudentHeader params={params} onChangeParams={onChangeParams} />

			<hr />

			<div className={styles.tableHeaderWrapper}>
				<StatisticRollUpByStudentNote />
			</div>

			<StatisticRollUpByStudentTable reportData={reportData} loading={isLoadingReportData} />
		</>
	)
}

export default StatisticRollUpByStudent
