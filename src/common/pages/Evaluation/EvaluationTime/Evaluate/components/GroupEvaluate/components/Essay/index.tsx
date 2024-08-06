import React from 'react'
import { useDispatch } from 'react-redux'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import { saveEssayAnswer } from '~/store/evaluationReducer'

interface IEssay {
	data: TQuestionDetail
	disabled?: boolean
}

const Essay: React.FC<IEssay> = (props) => {
	const { data, disabled } = props
	const dispatch = useDispatch()

	return (
		<div>
			<p className="text-[16px] font-medium mb-2">{data?.Content}</p>
			<MyTextArea
				onBlur={(e) => dispatch(saveEssayAnswer({ ...data, Answer: e.target.value }))}
				autoSize={{ minRows: 3 }}
				style={{ borderRadius: '6px' }}
				placeholder="Nội dung đánh giá..."
				disabled={disabled}
				defaultValue={data?.Answer || ''}
			/>
		</div>
	)
}

export default Essay
