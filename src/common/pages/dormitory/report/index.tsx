import { useState } from 'react'

import TableDormitoryReport from '~/common/pages/dormitory/report/components/TableDormitoryReport'
import StatusDormitory from '~/common/pages/dormitory/report/components/StatusDormitory'
import ViolationDormitory from '~/common/pages/dormitory/report/components/ViolationDormitory'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import FilterDormitoryHeader from '~/common/pages/dormitory/report/components/FilterDormitoryHeader'
import useStudentInOutDormitoryQuery from '~/common/pages/dormitory/report/hooks/useStudentInOutDormitoryQuery'
import useDormitoryWarningQuery from '~/common/pages/dormitory/report/hooks/useDormitoryWarningQuery'

export default function DormitoryReport() {
	const [startDate, setStartDate] = useState<string>('')
	const [endDate, setEndDate] = useState<string>('')
	const [select, setSelect] = useState<string>('')

	const studentInOutDormitoryQuery = useStudentInOutDormitoryQuery({ FromDate: startDate, ToDate: endDate, Search: select })
	const dormitoryWarningQuery = useDormitoryWarningQuery({ FromDate: startDate, ToDate: endDate, Search: select })

	return (
		<div className="space-y-6">
			<TableDormitoryReport />
			<MyStatisticCard
				title="Trạng thái & vi phạm ký túc xá"
				className="pb-6"
				extra={<FilterDormitoryHeader setStartDate={setStartDate} setEndDate={setEndDate} setSelect={setSelect} />}
			>
				<div className="space-y-4">
					<div className="space-y-4">
						<div className="space-y-4 pt-2">
							<h3 className="font-semibold">Trạng thái</h3>
							<StatusDormitory studentInOutDormitoryList={studentInOutDormitoryQuery?.data?.data?.data ?? []} />
						</div>
						<div className="space-y-4 pt-2">
							<h3 className="font-semibold">Vi phạm</h3>
							<ViolationDormitory
								totalWarning={dormitoryWarningQuery?.data?.data?.data?.TotalWarning ?? 0}
								violationDormitoryList={dormitoryWarningQuery?.data?.data?.data?.TotalWarningBasaeOnLevels ?? []}
							/>
						</div>
					</div>
				</div>
			</MyStatisticCard>
		</div>
	)
}
