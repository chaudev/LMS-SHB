import React from 'react'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import MyColumnChart from '~/common/antv-charts/Column/basic/MyColumnChart'
import useQueryStatisticUser12Months from '~/common/hooks/useQueryStatisticUser12Months'

interface IForeignLanguage {
	year: number
	branchId: any
}

const ForeignLanguageStatistic: React.FC<IForeignLanguage> = (props) => {
	const { year, branchId } = props
	const { data, isLoading } = useQueryStatisticUser12Months('ForeignLanguage', branchId, year, false)
	return (
		<MyStatisticCard title="Thống kê tình trạng học ngôn ngữ">
			<MyColumnChart data={data?.data || []} loading={isLoading} xField="Month" yField="Value" seriesField="Type" isGroup />
		</MyStatisticCard>
	)
}

export default ForeignLanguageStatistic
