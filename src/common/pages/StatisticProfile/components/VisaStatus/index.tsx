import React from 'react'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import MyColumnChart from '~/common/antv-charts/Column/basic/MyColumnChart'
import useQueryStatisticUser12Months from '~/common/hooks/useQueryStatisticUser12Months'

interface IVisaStatusStatistic {
	year: number
	branchId: any
}

const VisaStatusStatistic: React.FC<IVisaStatusStatistic> = (props) => {
	const { year, branchId } = props
	const { data, isLoading } = useQueryStatisticUser12Months('VisaStatus', branchId, year, false)
	return (
		<MyStatisticCard title="Thống kê trạng thái visa">
			<MyColumnChart
				data={data?.data || []}
				loading={isLoading}
				xField="Month"
				yField="Value"
				seriesField="Type"
				isGroup
				color={['#FFC100', '#FF8A08', '#FF6500', '#C40C0C']}
			/>
		</MyStatisticCard>
	)
}

export default VisaStatusStatistic
