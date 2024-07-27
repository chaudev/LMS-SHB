import React, { HTMLAttributes, memo } from 'react'
import dynamic from 'next/dynamic'
import { Empty } from 'antd'
const Pie = dynamic(() => import('@ant-design/plots').then(({ Pie }) => Pie), { ssr: false })
import { PieConfig } from '@ant-design/plots'
import { formatNumberToMillions, hasAnyKey, isNullOrEmptyOrUndefined } from '~/common/utils/main-function'
import { _format } from '~/common/utils'

interface IMyPieChart extends IChartProps, PieConfig {
	legendPosition?: 'bottom' | 'left' | 'right' | 'top'
	isDonut?: boolean
	isPercent?: boolean
	className?: HTMLAttributes<HTMLDivElement>['className']
}

const defaultColor = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6']

const MyPieChart: React.FC<IMyPieChart> = (props) => {
	const { loading, colorFunction, legendPosition, isDonut, isPercent, className, ...rest } = props

	const config = {
		appendPadding: 10,
		data: rest.data,
		// angleField: 'value',
		// colorField: 'key',
		radius: 0.8,
		innerRadius: isDonut ? 0.6 : 0,
		color: colorFunction || defaultColor,
		legend: {
			position: legendPosition || 'right'
		},
		label: {
			type: 'spider', // spider || outer
			// content: '{name} {percentage}'
			// content: '{percentage}'
			content: (data) => {
				if (data[rest.colorField] === 0) {
					return '' // Hide label if value percentage is 0
				}
				return isPercent ? `${Math.round(data.percent * 1000) / 10} %` : formatNumberToMillions(data.value)
			}
		},
		interactions: [
			{
				type: 'pie-legend-active'
			},
			{
				type: 'element-active'
			}
		],
		tooltip: {
			formatter: (data: any) => {
				return {
					name: data[rest.colorField],
					value: `${
						hasValueDetail(data[rest.colorField])
							? _format.numberToPrice(hasValueDetail(data[rest.colorField]))
							: _format.numberToPrice(data[rest.angleField])
					}`
				}
			}
		}
	}

	function hasValueDetail(colorField) {
		if (rest.data) {
			for (let i = 0; i < rest.data.length; i++) {
				if (hasAnyKey(rest.data[i], ['detail'])) {
					if (rest.data[i][rest.colorField] == colorField) {
						return rest.data[i]?.detail
					}
				} else {
					return null
				}
			}
		}
	}

	const pieProps = {
		...config,
		...rest,
		loading,
		className: `${loading ? 'hidden' : ''}`,
		statistic: {
			// title: false,
			title: {
				offsetY: -4,
				customHtml: (container, view, datum) => {
					return `<p style="font-size: 14px; line-height: 1.4">${rest.data?.length > 0 ? 'Tổng' : ''}<p>`
				}
			},
			content: {
				style: {
					whiteSpace: 'pre-wrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					fontSize: '20px'
				},
				customHtml(container, view, datum, data) {
					return `<p>${!isNullOrEmptyOrUndefined(data) ? _format.numberToPrice(data.reduce((r, d) => r + d[rest.angleField], 0)) : ''}</p>`
				}
				// content: 'AntV\nG2Plot'
			}
		}
	}

	return (
		<div className={`${className || 'h-[280px] relative'}`}>
			<Pie {...(pieProps as any)} />
			{rest.data?.length == 0 && (
				<div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
					<Empty description={<span className="text-gray-300">{'Không có dữ liệu'}</span>} />
				</div>
			)}
		</div>
	)
}

export default memo(MyPieChart)
