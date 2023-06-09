import { useEffect, useState } from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface IStatisticComposedChart {
	titleBar: any
	color: string
	data: Array<any>
}

const StatisticComposedChart = (props: IStatisticComposedChart) => {
	const { data, titleBar, color } = props

	const [hideXAxis, setHideXAxis] = useState(false)

	const renderLegend = (props) => {
		const { payload } = props

		useEffect(() => {
			window.addEventListener('resize', (e) => {
				const element = e.target as Window
				if (element.innerWidth < 1380) {
					setHideXAxis(true)
				} else {
					setHideXAxis(false)
				}
			})
		}, [])

		return (
			<ul className={`relative top-[10px] text-center text-[${color}]`}>
				{payload.map((entry, index) => (
					<li key={`item-${index}`}>
						<span className={`inline-block w-3 h-3 text-[${color}] mr-2`}></span>
						{entry.value}
					</li>
				))}
			</ul>
		)
	}

	return (
		<ResponsiveContainer width="100%" height={280}>
			<ComposedChart width={500} height={500} data={data}>
				<CartesianGrid stroke="#f5f5f5" />
				{hideXAxis ? <XAxis hide dataKey="Name" /> : <XAxis dataKey="Name" />}
				<YAxis />
				<Tooltip />
				<Legend content={renderLegend} />
				<Bar dataKey="Value" name={titleBar} barSize={20} fill={color} />
			</ComposedChart>
		</ResponsiveContainer>
	)
}

export default StatisticComposedChart
