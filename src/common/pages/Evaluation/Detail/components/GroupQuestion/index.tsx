import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import PrimaryButton from '~/common/components/Primary/Button'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import GroupQuestionForm from './components/GroupQuestionForm'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { evaluationQuestionApi } from '~/api/evaluation'

interface IGroupQuestion {
	evaluationGroupData: TSampleEvaluationGroup
}

const GroupQuestion: React.FC<IGroupQuestion> = (props) => {
	const { evaluationGroupData } = props
	const [isCreating, setIsCreating] = useState(false)
	const queryClient = useQueryClient()

	// ** get questions in group
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-sample-question-in-group', evaluationGroupData.Id],
		queryFn: () => {
			return evaluationQuestionApi
				.getDetail(evaluationGroupData.Id)
				.then((res) => res.data.data || [])
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: !!evaluationGroupData.Id
	})

	// ** handle click create question
	const handleCreateQuestion = () => {
		setIsCreating(true)
	}

	// ** handle change index
	const mutationChangeIndex = useMutation({
		mutationKey: ['CHANGE-INDEX-QUESTION'],
		mutationFn(payload: { Id: number; Index: number }[]) {
			return evaluationQuestionApi.changeIndex({ Items: payload })
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
		queryClient.setQueryData(['get-sample-question-in-group', evaluationGroupData.Id], (pre: any) => {
			return result
		})

		return result
	}

	return (
		<div className="col-span-4">
			{/* {isLoading && isNull(data) && <FormLoading />} */}
			{!isLoading && isNull(data) && !isCreating && (
				<div className="flex items-center flex-col bg-white rounded-[6px]">
					<div className="flex items-center gap-2">
						{/* <p className="font-medium text-[18px]">Tạo nhóm câu hỏi đầu tiên để bắt đầu</p> */}
						<PrimaryButton background="transparent" type="button" icon="add" onClick={() => handleCreateQuestion()}>
							Thêm câu hỏi
						</PrimaryButton>
					</div>
				</div>
			)}
			{!isLoading && !isNull(data) && (
				<div>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="droppable-id-evaluation-group-question">
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
													<GroupQuestionForm
														dragProps={provided.dragHandleProps}
														evaluationGroupData={evaluationGroupData}
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
						<div className="flex justify-center my-4">
							<PrimaryButton background="transparent" type="button" icon="add" onClick={() => handleCreateQuestion()}>
								Thêm câu hỏi
							</PrimaryButton>
						</div>
					)}
				</div>
			)}
			{isCreating && (
				<div className="mt-3">
					<GroupQuestionForm setIsCreating={setIsCreating} refreshData={refetch} evaluationGroupData={evaluationGroupData} />
				</div>
			)}
		</div>
	)
}

export default GroupQuestion
