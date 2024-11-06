import React from 'react'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import MyColumnChart from '~/common/antv-charts/Column/basic/MyColumnChart'
import useQueryStatisticUser12Months from '~/common/hooks/useQueryStatisticUser12Months'

interface IProcessStatistic {
	year: number
	branchId: any
}

const ProcessStatistic: React.FC<IProcessStatistic> = (props) => {
	const { year, branchId } = props
	const { data, isLoading } = useQueryStatisticUser12Months('Process', branchId, year, false)
	return (
		<MyStatisticCard title="Tiến trình xử lý hồ sơ">
			<MyColumnChart
				data={data?.data || []}
				loading={isLoading}
				xField="Month"
				yField="Value"
				seriesField="Type"
				isGroup
				color={['#E6FF94', '#9DDE8B', '#40A578', '#006769', '#344C64']}
			/>
		</MyStatisticCard>
	)
}

export default ProcessStatistic
