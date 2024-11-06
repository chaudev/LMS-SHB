import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React, { useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyDatePicker from '~/atomic/atoms/MyDatePicker'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import MyLineChart from '~/common/antv-charts/Line/basic/MyLineChart'

const TotalSalary12Months = () => {
	const [selectedBranch, setSelectedBranch] = useState(0)
	const [selectedYear, setSelectedYear] = useState(moment().year())

	const { data, isLoading } = useQuery({
		queryKey: ['get/total-salary-12-month', selectedBranch, selectedYear],
		queryFn: () => {
			return staticsticalApi.getTotalSalary12Months({ year: selectedYear, branchId: selectedBranch || 0 }).then((data) => data.data)
		},
		enabled: !!selectedYear
	})

	return (
		<MyStatisticCard
			title="Thống kê tổng lương hàng tháng"
			extra={
				<div className="flex items-center gap-2">
					<div className="w500:col-span-2 col-span-3">
						<MySelectBranch onChange={(e) => setSelectedBranch(e)} />
					</div>
					<div className="w500:col-span-2 col-span-3">
						<MyDatePicker
							className="w-full h-[36px] primary-input"
							onChange={(date: any, dateString: string) => {
								setSelectedYear(Number(dateString))
							}}
							value={moment().year(selectedYear)}
							picker="year"
							placeholder="Chọn năm"
							allowClear={false}
						/>
					</div>
				</div>
			}
		>
			<MyLineChart
				data={data?.data || []}
				loading={isLoading}
				xField="Month"
				yField="Value"
				seriesField="Type"
				smooth
				color={['#406ca5', '#cc2626']}
			/>
		</MyStatisticCard>
	)
}

export default TotalSalary12Months
