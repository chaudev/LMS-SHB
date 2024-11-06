import React, { HTMLAttributes, memo } from 'react'
import dynamic from 'next/dynamic'
const Area = dynamic(() => import('@ant-design/plots').then(({ Area }) => Area), { ssr: false })
import { AreaConfig } from '@ant-design/plots'
import { Empty } from 'antd'
import { formatNumberToMillions, truncate } from '~/common/utils/main-function'

interface IMyAreaChartt extends AreaConfig {
	// vị trí của legend (chú thích)
	legendPos?: 'top' | 'bottom' | 'left' | 'right'
	autoRotateLabel?: boolean
	labelXAxisConfig?: boolean
	className?: HTMLAttributes<HTMLDivElement>['className']
}

const MyAreaChart: React.FC<IMyAreaChartt> = (props) => {
	const { legendPos, loading, className, autoRotateLabel, labelXAxisConfig, ...rest } = props
	const config = {
		data: rest.data,
		xField: rest.xField,
		yField: rest.yField,
		yAxis: {
			// grid: {
			// 	line: null
			// },
			// label: {
			// 	formatter: (data: any) => {
			// 		return `${formatNumberToMillions(data)}`
			// 	}
			// }
		},
		xAxis: {
			range: [0, 1],
			// cái này chừng nào mà nhiều cột quá thì mới bật lên cho nó chỉ hiển thị 5 khoảng thôi
			// tickCount: 5
			label: labelXAxisConfig && {
				autoRotate: autoRotateLabel,
				autoHide: false,
				// autoEllipsis: true => bug thư viện nên k work 😥 => tự truncate lại bằng formatter
				formatter: (data: any) => {
					return `${truncate(data, 7)}`
				}
			}
		},
		areaStyle: () => {
			return {
				fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
			}
		},
		tooltip: {
			formatter: (data: any) => {
				return { name: data[rest.xField], value: `${Intl.NumberFormat().format(data.value)}` }
			}
		}
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

	const areaProps = {
		...config,
		...rest,
		legend: {
			position: legendPos || 'top',
			padding: getLegendPadding(legendPos)
		},
		loading,
		className: `${loading ? 'hidden' : ''}`,
		label: rest.label && {
			position: 'top',
			content: (data) => {
				if (data.value === 0) {
					return '' // Hide label if value percentage is 0
				}
				return `${formatNumberToMillions(data.value)}`
			},
			layout: []
		}
	}
	return (
		<div className={`${className || 'h-[350px] relative'}`}>
			<Area {...(areaProps as any)} />
			{!loading && rest.data?.length == 0 && (
				<div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
					<Empty description={<span className="text-gray-300">{'Không có dữ liệu'}</span>} />
				</div>
			)}
		</div>
	)
}

export default memo(MyAreaChart)
