import React, { useEffect, memo, HTMLAttributes } from 'react'
import dynamic from 'next/dynamic'
const Column = dynamic(() => import('@ant-design/plots').then(({ Column }) => Column), { ssr: false })
import { ColumnConfig } from '@ant-design/plots'
import { Empty } from 'antd'
import { deepMix } from '@antv/util'
import { formatNumberToMillions, truncate } from '~/common/utils/main-function'

interface IColumnChart extends IChartProps, ColumnConfig {
	// chart group
	isGroup?: boolean
	// chart scroll ngang
	isScroll?: boolean
	// tự động rotate label chart
	autoRotateLabel?: boolean
	// vị trí của legend (chú thích)
	legendPos?: 'top' | 'bottom' | 'left' | 'right'
	className?: HTMLAttributes<HTMLDivElement>['className']
	truncateNumber?: number
}

const MyColumnChart: React.FC<IColumnChart> = (props) => {
	const {
		loading,
		colorFunction,
		isGroup,
		isScroll,
		autoRotateLabel,
		legendPos,
		xField,
		yField,
		className,
		truncateNumber = 20,
		...rest
	} = props

	const config = {
		data: rest.data,
		isGroup: isGroup,
		xField: xField,
		yField: yField,
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
		// xAxis: { line: { style: { lineWidth: 0 } } },
		appendPadding: [20, 0, 0, 0],
		xAxis: {
			label: {
				autoRotate: autoRotateLabel,
				autoHide: false,
				// autoEllipsis: true => bug thư viện nên k work 😥 => tự truncate lại bằng formatter
				formatter: (data: any) => {
					return `${truncate(data, truncateNumber)}`
				}
			}
		},
		seriesField: isGroup ? 'type' : xField, // type này dùng để phân biệt màu của cột nếu đang dùng group chart
		tooltip: {
			formatter: (data: any) => {
				return { name: isGroup ? data[rest.seriesField] : data[xField], value: `${Intl.NumberFormat().format(data[yField])}` }
			}
		},
		color: colorFunction || ['#A7E6FF', '#3ABEF9', '#3572EF', '#050C9C', '#F27BBD', '#C65BCF', '#874CCC', '#10439F'],
		columnStyle: {
			radius: [5, 5, 0, 0]
		},
		theme: deepMix(
			{},
			{
				components: {
					scrollbar: {
						default: {
							style: {
								trackColor: 'rgba(0,0,0,0.05)',
								thumbColor: 'rgba(0,0,0,0.2)'
							}
						},
						hover: {
							style: {
								thumbColor: 'rgba(0,0,0,0.4)'
							}
						}
					}
				}
			}
		),
		minColumnWidth: 20,
		maxColumnWidth: 30
		// dodgePadding: 2
	}

	const getLegendPadding = (pos: string) => {
		switch (pos) {
			case 'top':
				return [0, 0, 30, 0]
			case 'bottom':
				return [30, 0, 0, 0]
			default:
				return [0, 0, 30, 0]
		}
	}

	const columnProps = {
		...config,
		...rest,
		legend: rest.legend && {
			position: legendPos || 'top',
			padding: getLegendPadding(legendPos)
		},
		loading,
		className: `${loading ? 'hidden' : ''}`,
		scrollbar: isScroll && {
			type: 'horizontal'
		},

		label: {
			position: 'top',
			// 'top', 'middle', 'bottom'
			content: (data) => {
				if (data[yField] === 0) {
					return '' // Hide label if value percentage is 0
				}
				return `${formatNumberToMillions(data[yField])}`
			},
			layout: [
				// {
				// 	type: 'interval-adjust-position'
				// },
				{
					type: 'interval-hide-overlap'
				},
				{
					type: 'adjust-color'
				}
			]
		}
	}

	return (
		<div className={`${className || 'h-[350px] relative'}`}>
			<Column {...(columnProps as any)} />
			{!loading && rest.data?.length == 0 && (
				<div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
					<Empty description={<span className="text-gray-300">{'Không có dữ liệu'}</span>} />
				</div>
			)}
		</div>
	)
}

export default memo(MyColumnChart)
