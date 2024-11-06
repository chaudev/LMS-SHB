import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { PlusCircle } from 'react-feather'
import { evaluationOptionApi } from '~/api/evaluation'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import MultipleOptionForm from './components/MultipleOptionForm'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface IMultipleOptions {
	evaluationQuestionData: TSampleEvaluationQuestion
}

const MultipleOptions: React.FC<IMultipleOptions> = (props) => {
	const { evaluationQuestionData } = props
	const [isCreating, setIsCreating] = useState(false)
	const queryClient = useQueryClient()

	// ** get options multiple in question group
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-sample-option-in-question', evaluationQuestionData.Id],
		queryFn: () => {
			return evaluationOptionApi
				.getDetail(evaluationQuestionData.Id)
				.then((res) => res.data.data || [])
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: !!evaluationQuestionData.Id
	})

	// ** handle click create question
	const handleCreateQuestion = () => {
		setIsCreating(true)
	}

	// ** handle change index
	const mutationChangeIndex = useMutation({
		mutationKey: ['CHANGE-INDEX-QUESTION-OPTION'],
		mutationFn(payload: { Id: number; Index: number }[]) {
			return evaluationOptionApi.changeIndex({ Items: payload })
		}
		// onMutate() {
		// 	setIsSaving(true)
		// },
		// onSuccess() {
		// 	setIsSaving(false)
		// }
	})

	// ** handle swap index
	const handleDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return
		}
		reorder(data, result.source.index, result.destination.index)
	}

	// ** a little function to help with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)
		const payloadChange = result.map((item: TSampleEvaluationGroup, index) => ({
			Id: item.Id,
			Index: index + 1
		}))
		mutationChangeIndex.mutate(payloadChange)
		queryClient.setQueryData(['get-sample-option-in-question', evaluationQuestionData.Id], (pre: any) => {
			return result
		})

		return result
	}

	return (
		<div className="col-span-4 pb-2">
			{!isLoading && isNull(data) && !isCreating && (
				<div className="flex items-center rounded-[6px]">
					<div className="flex items-center gap-2">
						<button type="button" onClick={() => handleCreateQuestion()} className="text-tw-blue hover:underline flex items-center gap-1">
							<PlusCircle size={16} />
							Thêm tùy chọn
						</button>
					</div>
				</div>
			)}

			{!isLoading && !isNull(data) && (
				<div>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="droppable-id-evaluation-option-question">
							{(provided, snapshot) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{data?.map((item, index) => (
										<Draggable key={item.Id} draggableId={`${item.Id}`} index={index}>
											{(provided, snapshot) => (
												<div
													id={item?.Id}
													key={item?.Id + 'nopls'}
													ref={provided.innerRef}
													{...provided.draggableProps}
													// {...provided.dragHandleProps}
													className="first:mt-0 mt-3"
												>
													<MultipleOptionForm
														dragProps={provided.dragHandleProps}
														evaluationQuestionData={evaluationQuestionData}
														key={`properties-${item.Id}`}
														refreshData={refetch}
														defaultData={item}
														isDragging={snapshot.isDragging}
													/>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					{!isCreating && (
						<button
							type="button"
							onClick={() => handleCreateQuestion()}
							className="text-tw-blue hover:underline flex items-center gap-1 mt-4"
						>
							<PlusCircle size={16} />
							Thêm tùy chọn
						</button>
					)}
				</div>
			)}

			{isCreating && (
				<div className="mt-3">
					<MultipleOptionForm setIsCreating={setIsCreating} refreshData={refetch} evaluationQuestionData={evaluationQuestionData} />
				</div>
			)}
		</div>
	)
}

export default MultipleOptions
