import { useState } from 'react'
import StatisticRollUpHeader from './StatisticRollUpHeader'
import { rollUpApi } from '~/api/rollup'
import { useQuery } from '@tanstack/react-query'
import { Card } from 'antd'
import StatisticRollUpTable from './StatisticRollUpTable'
import PrimaryButton from '~/common/components/Primary/Button'
import StatisticRollUpNote from './StatisticRollUpNote'
import styles from './styles.module.scss'

export type TStatisticRollUpParams = {
	branchIds?: string
	classIds?: string
	from?: string
	to?: string
}

const StatisticRollUpPage = () => {
	const [params, setParams] = useState<TStatisticRollUpParams>({
		branchIds: undefined,
		classIds: undefined,
		from: undefined,
		to: undefined
	})

	// ===== FETCH DATA =====
	const { data: reportData, isLoading: isLoadingReportData } = useQuery({
		queryKey: [rollUpApi.keyGetReport, [params?.branchIds, params?.classIds, params?.from, params?.to]],
		queryFn: () => {
			return rollUpApi.getReport({ ...params }).then((res) => res.data?.data)
		},
		enabled: !!params?.branchIds && !!params?.classIds
	})

	// ===== METHODS =====
	const onChangeParams = (newParams: TStatisticRollUpParams) => {
		setParams({ ...params, ...newParams })
	}

	return (
		<Card>
			<StatisticRollUpHeader params={params} onChangeParams={onChangeParams} />

			<hr />

			<div className={styles.tableHeaderWrapper}>
				<StatisticRollUpNote />

				<div className={styles.buttonExportWrapper}>
					<PrimaryButton type="button" background="green" icon="excel">
						Xuất excel
					</PrimaryButton>
				</div>
			</div>

			<StatisticRollUpTable reportData={reportData} loading={isLoadingReportData} />
		</Card>
	)
}

export default StatisticRollUpPage
