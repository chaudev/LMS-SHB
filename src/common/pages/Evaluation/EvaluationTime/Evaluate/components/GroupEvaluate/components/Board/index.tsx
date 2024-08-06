import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MyRadio from '~/atomic/atoms/MyRadio'
import MyRadioGroup from '~/atomic/molecules/MyRadioGroup'
import { getBorderBoardStyle } from '~/common/pages/Evaluation/functions'
import { saveMultipleAnswer } from '~/store/evaluationReducer'

interface IBoard {
	data: TGroupDetail
	disabled?: boolean
}

const Board: React.FC<IBoard> = (props) => {
	const { data, disabled } = props
	const dispatch = useDispatch()
	// ** handle select
	const onChange = (e) => {
		const selectedId = e.target.value
		const selectedQuesion = data?.EvaluationQuestionDetails?.find((item) =>
			item?.EvaluationOptionDetails?.find((item) => item.Id === selectedId)
		)
		const payload = selectedQuesion?.EvaluationOptionDetails?.map((item) =>
			item?.Id === selectedId
				? {
						...item,
						IsChoose: true
				  }
				: item
		)
		// console.log(
		// 	selectedId,
		// 	selectedQuesion?.EvaluationOptionDetails?.map((item) =>
		// 		item?.Id === selectedId
		// 			? {
		// 					...item,
		// 					IsChoose: true
		// 			  }
		// 			: item
		// 	),
		// 	'selected-board----'
		// )
		dispatch(saveMultipleAnswer(payload))
	}

	// ** get checked value
	const getCheckedValue = (item: TQuestionDetail) => {
		if (disabled) {
			if (item) {
				let checked = item.EvaluationOptionDetails?.find((item) => item.IsChoose)?.Id
				return checked
			}
		}
	}

	return (
		<div>
			<div className="min-h-2 flex w-full ">
				<div
					className={`w-4/12 ${getBorderBoardStyle({
						index: 0,
						rightCol: false,
						dataLength: 2
					})} border-transparent`}
				></div>
				<div
					className={`w-9/12 ${getBorderBoardStyle({
						index: 0,
						rightCol: true,
						dataLength: 2
					})} border-[#ccc] grid`}
					style={{ gridTemplateColumns: `repeat(${data?.EvaluationQuestionDetails[0]?.EvaluationOptionDetails?.length}, minmax(0, 1fr))` }}
				>
					{data?.EvaluationQuestionDetails[0]?.EvaluationOptionDetails?.map((option) => (
						<div
							key={option.Id + 'opt'}
							className="first:border-l-0 border-l border-l-[#ccc] flex flex-col items-center p-2 justify-center font-medium bg-primaryExtraLight !text-primary"
						>
							<p>{option.Point}</p>
							<p>{option.Content}</p>
						</div>
					))}
				</div>
			</div>
			{data?.EvaluationQuestionDetails?.map((item, index) => (
				<div key={item?.Id + 'ques'} className="min-h-2 flex w-full ">
					<div
						className={`w-4/12 ${getBorderBoardStyle({
							index: index,
							rightCol: false,
							dataLength: data?.EvaluationQuestionDetails?.length
						})} border-[#ccc]`}
					>
						<p className="p-2 whitespace-pre-wrap">{item?.Content}</p>
					</div>
					<div
						className={`w-9/12 ${getBorderBoardStyle({
							index: index,
							rightCol: true,
							dataLength: data?.EvaluationQuestionDetails?.length
						})} border-[#ccc]`}
					>
						<MyRadioGroup
							onChange={onChange}
							name={`${item?.Id}`}
							noSpace
							className="w-full"
							disabled={disabled}
							defaultValue={disabled ? getCheckedValue(item) : null}
						>
							<div
								className="grid"
								style={{
									gridTemplateColumns: `repeat(${item?.EvaluationOptionDetails?.length}, minmax(0, 1fr))`
								}}
							>
								{item?.EvaluationOptionDetails?.map((option) => (
									<label
										htmlFor={`${option?.Id}`}
										key={option.Id + 'checkboxWrap'}
										className={`${
											disabled ? 'cursor-not-allowed' : 'cursor-pointer'
										} hover:bg-tw-gray first:border-l-0 border-l border-l-[#ccc] flex flex-col items-center p-2 justify-center font-medium `}
									>
										<MyRadio id={`${option?.Id}`} key={option?.Id + 'checkbox'} value={option?.Id}></MyRadio>
									</label>
								))}
							</div>
						</MyRadioGroup>
					</div>
				</div>
			))}
		</div>
	)
}

export default Board
