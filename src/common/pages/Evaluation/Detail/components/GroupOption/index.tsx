import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { evaluationGroupOptionApi } from '~/api/evaluation'
import PrimaryButton from '~/common/components/Primary/Button'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import GroupOptionForm from './components/GroupOptionForm'
import { PlusCircle } from 'react-feather'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import GroupOptionColumn from './components/GroupOptionColumn'

interface IGroupOption {
	evaluationGroupData: TSampleEvaluationGroup
}

const GroupOption: React.FC<IGroupOption> = (props) => {
	const { evaluationGroupData } = props
	const queryClient = useQueryClient()

	// ** get option evaluation in group
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-option-evaluation-in-group', evaluationGroupData.Id],
		queryFn: () => {
			return evaluationGroupOptionApi
				.getDetail(evaluationGroupData.Id)
				.then((res) => res.data.data || [])
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: !!evaluationGroupData.Id
	})

	// ** handle change index
	const mutationChangeIndex = useMutation({
		mutationKey: ['CHANGE-INDEX-GROUP-OPTION'],
		mutationFn(payload: { Id: number; Index: number }[]) {
			return evaluationGroupOptionApi.changeIndex({ Items: payload })
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
		queryClient.setQueryData(['get-option-evaluation-in-group', evaluationGroupData.Id], (pre: any) => {
			return result
		})

		return result
	}

	return (
		<div className="">
			{!isLoading && isNull(data) && (
				<div className="flex justify-center w-full">
					<GroupOptionForm refreshData={refetch} evaluationGroupData={evaluationGroupData} />
				</div>
			)}

			{!isLoading && !isNull(data) && (
				<div className="">
					<div className="mb-2 ml-1 flex justify-end">
						<GroupOptionForm refreshData={refetch} evaluationGroupData={evaluationGroupData} />
					</div>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="droppable-id-evaluation-group-option" direction="horizontal">
							{(provided, snapshot) => (
								<div {...provided.droppableProps} ref={provided.innerRef} className="p-2 flex justify-end overflow-x-auto">
									{data?.map((item, index) => (
										<Draggable key={item.Id} draggableId={`${item.Id}`} index={index}>
											{(provided, snapshot) => (
												<div
													id={item?.Id}
													key={item?.Id + 'nopls'}
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<GroupOptionColumn
														// dragProps={provided.dragHandleProps}
														evaluationGroupData={evaluationGroupData}
														key={`properties-${item.Id}`}
														refreshData={refetch}
														data={item}
														// isDragging={snapshot.isDragging}
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
				</div>
			)}
		</div>
	)
}

export default GroupOption
