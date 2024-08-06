import React from 'react'
import MyDivider from '~/atomic/atoms/MyDivider'
import { EVALUATION_TYPES } from '~/common/utils/constants'
import Essay from './components/Essay'
import MultipleChoice from './components/MultipleChoice'
import Board from './components/Board'

interface IGroupEvaluate {
	data: TGroupDetail
	disabled?: boolean
}

const GroupEvaluate: React.FC<IGroupEvaluate> = (props) => {
	const { data, disabled } = props
	return (
		<div>
			<MyDivider />
			{data?.EvaluationQuestionDetails?.map((item) => (
				<div key={item.Id} className="first:mt-0 mt-3">
					{item?.Type == EVALUATION_TYPES.essay && <Essay data={item} disabled={disabled} />}
					{item?.Type == EVALUATION_TYPES.multipleChoice && <MultipleChoice data={item} disabled={disabled} />}
				</div>
			))}
			{data?.Type == EVALUATION_TYPES.evaluate && <Board data={data} disabled={disabled} />}
		</div>
	)
}

export default GroupEvaluate
