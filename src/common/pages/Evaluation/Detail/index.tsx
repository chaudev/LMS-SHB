import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { evaluationGroupApi } from '~/api/evaluation'
import FormLoading from './components/FormLoading'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import Lottie from 'react-lottie-player'
import empty from '~/common/components/json/empty-table.json'
import PrimaryButton from '~/common/components/Primary/Button'
import GroupForm from './components/GroupForm'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const EvaluationDetail = () => {
	const router = useRouter()
	const { evaluationFormId } = router.query
	const [isCreating, setIsCreating] = useState(false)
	const queryClient = useQueryClient()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-sample-group-in-form', evaluationFormId],
		queryFn: () => {
			return evaluationGroupApi
				.getDetail(evaluationFormId)
				.then((res) => res.data.data || [])
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: router.isReady && !!evaluationFormId
	})

	// ** handle click create group
	const handleCreateGroup = () => {
		setIsCreating(true)
	}

	// ** handle change index
	const mutationChangeIndex = useMutation({
		mutationKey: ['CHANGE-INDEX'],
		mutationFn(payload: { Id: number; Index: number }[]) {
			return evaluationGroupApi.changeIndex({ Items: payload })
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
		queryClient.setQueryData(['get-sample-group-in-form', evaluationFormId], (pre: any) => {
			return result
		})

		return result
	}

	return (
		<div className="w750:max-w-[800px] mx-auto">
			{isLoading && isNull(data) && <FormLoading />}
			{!isLoading && isNull(data) && !isCreating && (
				<div className="flex items-center flex-col bg-white rounded-[6px] p-4">
					<Lottie loop animationData={empty} play className="inner w-[300px] mx-auto" />
					<div className="flex items-center gap-2">
						<p className="font-medium text-[18px]">Tạo nhóm đánh giá đầu tiên để bắt đầu</p>
						<PrimaryButton background="green" type="button" icon="add" onClick={() => handleCreateGroup()}>
							Thêm nhóm đánh giá
						</PrimaryButton>
					</div>
				</div>
			)}
			{!isLoading && !isNull(data) && (
				<div>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="droppable-id-evaluation">
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
													<GroupForm
														dragProps={provided.dragHandleProps}
														key={`properties-${item.Id}`}
														refreshData={refetch}
														defaultData={item}
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
							<PrimaryButton background="green" type="button" icon="add" onClick={() => handleCreateGroup()}>
								Thêm nhóm đánh giá
							</PrimaryButton>
						</div>
					)}
				</div>
			)}
			{isCreating && (
				<div className="mt-3">
					<GroupForm setIsCreating={setIsCreating} refreshData={refetch} />
				</div>
			)}
		</div>
	)
}

export default EvaluationDetail
