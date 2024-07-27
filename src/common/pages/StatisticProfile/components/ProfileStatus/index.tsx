import React from 'react'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import MyColumnChart from '~/common/antv-charts/Column/basic/MyColumnChart'
import useQueryStatisticUser12Months from '~/common/hooks/useQueryStatisticUser12Months'

interface IProfileStatusStatistic {
	year: number
	branchId: any
}

const ProfileStatusStatistic: React.FC<IProfileStatusStatistic> = (props) => {
	const { year, branchId } = props
	const { data, isLoading } = useQueryStatisticUser12Months('ProfileStatus', branchId, year, false)
	return (
		<MyStatisticCard title="Tiến trình thu hồ sơ">
			<MyColumnChart
				data={data?.data || []}
				loading={isLoading}
				xField="Month"
				yField="Value"
				seriesField="Type"
				isGroup
				color={['#D95F59', '#C63C51', '#8C3061', '#522258']}
			/>
		</MyStatisticCard>
	)
}

export default ProfileStatusStatistic
