import React, { HTMLAttributes, memo } from 'react'
import dynamic from 'next/dynamic'
import { Empty } from 'antd'
const Line = dynamic(() => import('@ant-design/plots').then(({ Line }) => Line), { ssr: false })
import { LineConfig } from '@ant-design/plots'
import { formatNumberToMillions } from '~/common/utils/main-function'

interface ILineChart extends IChartProps, LineConfig {
	smooth?: boolean
	haveSlider?: boolean
	className?: HTMLAttributes<HTMLDivElement>['className']
	legendPos?: 'top' | 'bottom' | 'left' | 'right'
}

const MyLineChart: React.FC<ILineChart> = (props) => {
	const { dataList, loading, colorFunction, xField, yField, smooth, className, haveSlider, legendPos, ...rest } = props

	console.log('dataList', dataList)

	const config = {
		data: dataList,
		// padding: 'auto',
		xField: xField,
		yField: yField,
		xAxis: {
			// type: 'timeCat',
			// tickCount: 10, cái này là giới hạn số lượng label của cột x được hiển thị
			label: {
				formatter: (data: any) => {
					return `${formatNumberToMillions(data)}`
				}
			}
		},
		yAxis: {
			// grid: {
			// 	line: null
			// },
			label: {
				formatter: (data: any) => {
					return `${formatNumberToMillions(data)}`
				}
			}
		},
		legend: {
			position: legendPos || 'top'
		},
		tooltip: {
			formatter: (data: any) => {
				return { name: data[rest.seriesField], value: `${Intl.NumberFormat().format(data[yField])}` }
			}
		},
		slider: null,
		smooth: smooth,
		animation: {
			appear: {
				animation: 'path-in',
				duration: 2000
			}
		}
	}

	if (haveSlider) {
		config.slider = {
			start: 0,
			end: 1
		}
	}

	const lineProps = {
		...config,
		...rest,
		loading,
		className: `${loading ? 'hidden' : ''}`
	}

	return (
		<div className={`${className || 'h-[350px] relative'}`}>
			<Line {...(lineProps as any)} />
			{!loading && dataList?.length == 0 && (
				<div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
					<Empty description={<span className="text-gray-300">{'Không có dữ liệu'}</span>} />
				</div>
			)}
		</div>
	)
}

export default memo(MyLineChart)
