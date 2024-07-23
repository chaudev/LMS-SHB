import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { sampleTranscriptDetailApi } from '~/api/grade-templates'
import MyModal from '~/atomic/atoms/MyModal'
import IconButton from '~/common/components/Primary/IconButton'
import TranscriptColumnModal from './TranscriptColumnModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import MyLoadingSmallContent from '~/atomic/atoms/MyLoadingSmallContent'
import SampleColumn from './SampleColumn'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'

interface ISampleTranscriptDetail {
	defaultData: TSampleTranscript
}

const SampleTranscriptDetail: React.FC<ISampleTranscriptDetail> = (props) => {
	const { defaultData } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const queryClient = useQueryClient()
	// ** get data
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get/sample-transcript-detail-column', defaultData?.Id],
		queryFn: () => {
			return sampleTranscriptDetailApi.getTranscriptColumns(defaultData?.Id).then((data) => data.data)
		},
		enabled: !!defaultData?.Id && isModalVisible
	})

	const mutationChangeIndex = useMutation({
		mutationKey: ['CHANGE-INDEX'],
		mutationFn(payload: { Id: number; Index: number }[]) {
			return sampleTranscriptDetailApi.changeIndex({ Items: payload })
		},
		// onMutate() {
		// 	setIsSaving(true)
		// },
		onError(error, variables, context) {
			ShowErrorToast(error)
		}
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
		reorder(data?.data, result.source.index, result.destination.index)
	}

	// ** a little function to help with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)
		const payloadChange = result.map((item: TSampleTranscriptDetail, index) => ({
			Id: item.Id,
			Index: index + 1
		}))
		mutationChangeIndex.mutate(payloadChange)
		console.log(payloadChange, result, 'huhuheheh')
		queryClient.setQueryData(['get/sample-transcript-detail-column', defaultData?.Id], (pre: any) => {
			// console.log('PROFILE', {
			// 	...pre,
			// 	items: result
			// })

			return {
				...pre,
				data: result
			}
		})

		return result
	}

	return (
		<div>
			<IconButton type="button" color="orange" icon="eye" onClick={() => setIsModalVisible(true)} tooltip="Cấu hình bảng điểm" />

			<MyModal width={1200} title={'Cấu hình bảng điểm'} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
				<div className="flex justify-between">
					<div className="flex items-center">
						<span className="font-medium mr-2">Loại cột điểm:</span>{' '}
						<div className="p-2 outline-2 outline-primary outline bg-primaryExtraLight w-fit">Điểm</div>
						<div className="p-2 outline-2 outline-primary outline bg-[#fffbe7] w-fit">Nhận xét</div>
					</div>
					<TranscriptColumnModal refreshData={refetch} sampleTranscriptData={defaultData} />
				</div>

				{isLoading && <MyLoadingSmallContent />}
				{!isLoading && !isNull(data) && (
					<div className="mt-4 max-w-[1250px] overflow-x-auto">
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable droppableId="droppable-id-grades" direction="horizontal">
								{(provided, snapshot) => (
									<div {...provided.droppableProps} ref={provided.innerRef} className="p-2 flex">
										{data?.data?.map((item, index) => (
											<Draggable key={item.Id} draggableId={`${item.Id}`} index={index}>
												{(provided, snapshot) => (
													<div
														id={item?.Id}
														key={item?.Id + 'nopls'}
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className=""
													>
														<SampleColumn
															key={`properties-${item.Id}`}
															data={item}
															refreshData={refetch}
															sampleTranscriptData={defaultData}
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
				{!isLoading && isNull(data) && (
					<div className="font-medium mt-4 w-full text-center !text-primary">Không có dữ liệu nào để hiển thị</div>
				)}
			</MyModal>
		</div>
	)
}

export default SampleTranscriptDetail
