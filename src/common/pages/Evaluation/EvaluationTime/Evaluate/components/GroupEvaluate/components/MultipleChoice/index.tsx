import React from 'react'
import { useDispatch } from 'react-redux'
import MyRadio from '~/atomic/atoms/MyRadio'
import MyRadioGroup from '~/atomic/molecules/MyRadioGroup'
import { saveMultipleAnswer } from '~/store/evaluationReducer'

interface IMultipleChoice {
	data: TQuestionDetail
	disabled?: boolean
}

const MultipleChoice: React.FC<IMultipleChoice> = (props) => {
	const { data, disabled } = props
	const dispatch = useDispatch()

	// ** handle select answer
	const onChange = (e) => {
		const selectedId = e.target.value
		// console.log(selectedId, data, 'select-multiple-choice----')
		const payload = data?.EvaluationOptionDetails?.map((item) =>
			item?.Id === selectedId
				? {
						...item,
						IsChoose: true
				  }
				: item
		)
		// console.log(payload, 'payload-multiple--choice')
		dispatch(saveMultipleAnswer(payload))
	}

	// ** get checked value
	const getCheckedValue = () => {
		if (disabled) {
			let checked
			checked = data?.EvaluationOptionDetails?.find((item) => item.IsChoose)?.Id
			return checked
		}
	}

	return (
		<div>
			<p className="text-[16px] font-medium mb-2">{data?.Content}</p>
			<MyRadioGroup onChange={onChange} disabled={disabled} defaultValue={disabled ? getCheckedValue() : null}>
				{data?.EvaluationOptionDetails?.map((item) => (
					<MyRadio key={item?.Id + 'opt'} value={item?.Id}>
						{item?.Content}
					</MyRadio>
				))}
			</MyRadioGroup>
		</div>
	)
}

export default MultipleChoice
