import { memo } from 'react'

import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import PrimaryTable from '~/common/components/Primary/Table'
import columnDormitoryReport from '~/common/pages/dormitory/report/components/ColumnDormitoryReport'
import useDormitoryReportListQuery from '~/common/pages/dormitory/report/hooks/useDormitoryReportListQuery'
import { _format } from '~/common/utils'

function TableDormitoryReport() {
	const dormitoryReportListQuery = useDormitoryReportListQuery()
	const statisticDormitoryList = dormitoryReportListQuery?.data?.data?.data ?? []

	return (
		<MyStatisticCard title="Thống kê ký túc xá">
			<PrimaryTable
				columns={columnDormitoryReport}
				data={statisticDormitoryList}
				loading={dormitoryReportListQuery.isPending}
				className="border-none"
				// total={data?.totalRow || 0}
				// onChangePage={(pageIndex) => setPageFilter({ ...pageFilter, pageIndex: pageIndex })}
			/>
		</MyStatisticCard>
	)
}
export default memo(TableDormitoryReport)
