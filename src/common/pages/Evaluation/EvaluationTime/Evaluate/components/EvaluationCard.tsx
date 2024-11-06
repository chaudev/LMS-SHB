import { Card } from 'antd'
import React from 'react'
import { getBorderStyle } from '../../../functions'

interface IEvaluationCard {
	type: string | 'header'
	children?: React.ReactNode
	title?: string
	description?: string
}

const EvaluationCard: React.FC<IEvaluationCard> = (props) => {
	const { type, children, title, description } = props

	return (
		<Card className={`${type == 'header' ? 'border-t-[8px] border-t-tw-primary' : 'border-l-[5px]'}  ${getBorderStyle(type)}`}>
			<p className="font-medium text-2xl">{title}</p>
			<p className="mt-2 whitespace-pre-wrap">{description}</p>
			{children}
		</Card>
	)
}

export default EvaluationCard
