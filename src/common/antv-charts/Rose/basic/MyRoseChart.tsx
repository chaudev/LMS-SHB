import React, { HTMLAttributes, memo } from 'react'
import dynamic from 'next/dynamic'
import { Empty } from 'antd'
const Rose = dynamic(() => import('@ant-design/plots').then(({ Rose }) => Rose), { ssr: false })
import { RoseConfig } from '@ant-design/plots'
import { formatNumberToMillions, isNullOrEmptyOrUndefined } from '~/common/utils/main-function'

interface IMyRoseChartt extends IChartProps, RoseConfig {
	legendPosition?: 'bottom' | 'left' | 'right' | 'top'
	isDonut?: boolean
	isPercent?: boolean
	className?: HTMLAttributes<HTMLDivElement>['className']
}

const defaultColor = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6']

const MyRoseChart: React.FC<IMyRoseChartt> = (props) => {
	const { loading, colorFunction, legendPosition, isDonut, isPercent, className, ...rest } = props

	const config = {
		data: rest.data,
		xField: rest.xField,
		yField: rest.yField,
		seriesField: rest.xField,
		radius: 0.9,
		isStack: false,
		// color: colorFunction || defaultColor,
		legend: {
			position: legendPosition || 'right'
		},
		tooltip: {
			formatter: (data: any) => {
				return { name: data[rest.yField], value: `${Intl.NumberFormat().format(data.value)}` }
			}
		}
	}

	const roseProps = {
		...config,
		...rest,
		loading,
		className: `${loading ? 'hidden' : ''}`
	}

	return (
		<div className={`${className || 'h-[280px] relative'}`}>
			<Rose {...(roseProps as any)} />
			{rest.data?.length == 0 && (
				<div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
					<Empty description={<span className="text-gray-300">{'Không có dữ liệu'}</span>} />
				</div>
			)}
		</div>
	)
}

export default memo(MyRoseChart)
