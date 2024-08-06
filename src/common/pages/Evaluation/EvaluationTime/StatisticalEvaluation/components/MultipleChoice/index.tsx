import React from 'react'
import MyDivider from '~/atomic/atoms/MyDivider'
import MyPieChart from '~/common/antv-charts/Pie/basic/MyPieChart'

interface IMultipleChoiceStatistical {
	data: TListGroup
}

const MultipleChoiceStatistical: React.FC<IMultipleChoiceStatistical> = (props) => {
	const { data } = props
	return (
		<div>
			<MyDivider />
			{data?.ListQuestion?.map((item) => (
				<div key={crypto.randomUUID()} className="first:mt-0 mt-2 ">
					<p className="text-[16px] font-medium">{item?.Content}</p>
					<p>{item?.ListOption?.reduce((totalChoose, item) => totalChoose + item.TotalChoose, 0)} đánh giá</p>

					<MyPieChart
						loading={false}
						legendPosition="right"
						angleField="TotalChoose"
						colorField="Content"
						isDonut={false}
						className="h-[200px]"
						isPercent={true}
						data={item?.ListOption}
					/>
				</div>
			))}
		</div>
	)
}

export default MultipleChoiceStatistical
