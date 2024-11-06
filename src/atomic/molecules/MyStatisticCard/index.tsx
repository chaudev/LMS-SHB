import { Card, CardProps } from 'antd'
import React from 'react'

type TMyStatisticCard = {
	children: React.ReactNode
	title: React.ReactNode
} & CardProps

const MyStatisticCard: React.FC<TMyStatisticCard> = (props) => {
	const { children, title, ...rest } = props
	return (
		<Card title={<h1 className="text-2xl font-medium">{title}</h1>} {...rest}>
			{children}
		</Card>
	)
}

export default MyStatisticCard
