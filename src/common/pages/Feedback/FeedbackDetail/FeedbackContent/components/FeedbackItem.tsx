import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { feedbackReplyApi } from '~/api/feedback-reply'
import Avatar from '~/common/components/Avatar'
import { ShowNostis } from '~/common/utils'
import FeedbackForm from './FeedbackForm'
import { getDate } from '~/common/utils/super-functions'
import moment from 'moment'
import { PrimaryTooltip } from '~/common/components'
import { Popconfirm, Popover } from 'antd'
import { FEEDBACK_STATUS } from '~/common/utils/constants'
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'

interface IFeedbackItem {
	data: TFeedbackReply
	onRefresh: Function
	detailsData: TFeedbackDetail
}

const FeedbackItem: React.FC<IFeedbackItem> = (props) => {
	const { data, onRefresh, detailsData } = props
	const [loading, setLoading] = useState(false)
	const queryClient = useQueryClient()
	const router = useRouter()
	const { push, query } = router
	const [showPop, setShowPop] = useState<any>()
	const [editContent, setEditContent] = useState(false)
	const feedbackDetail: any = queryClient.getQueryData(['get-feedback-list', data?.FeedbackId])

	const mutationDelete = useMutation({
		mutationKey: ['DELETE-REPLY'],
		mutationFn: (id: any) => feedbackReplyApi.delete(id),
		onSuccess() {
			ShowNostis.success('Xóa thành công')
			queryClient.refetchQueries({ queryKey: ['get-feedback-list', data?.FeedbackId] })
			// queryClient?.setQueryData(['get-feedback-list', data?.FeedbackId], (oldList: any) => {
			// 	return { ...oldList, replies: oldList?.replies.filter((item) => item.id !== variables) }
			// })
		}
	})

	const onEditContent = () => {
		setEditContent(true)
	}

	return (
		<div className="my-6 flex w-full justify-between">
			{!editContent && (
				<div className="flex gap-2">
					<Avatar uri={data?.IsIncognito ? '/images/incognito.png' : data?.Avatar} className="h-10 w-10 object-cover rounded-full" />
					<div className="flex-1">
						<div className="flex smartphone:items-center smartphone:flex-row flex-col gap-x-2 smartphone:mb-0 mb-2">
							<p className="font-[700]">{!data?.IsIncognito ? data?.CreatedBy : 'Ẩn danh'}</p>
							<PrimaryTooltip id={`date-${data?.Id}`} content={getDate(data?.CreatedOn).full} place="top">
								<p className="text-gray-500">{moment(data?.CreatedOn).fromNow()}</p>
							</PrimaryTooltip>
						</div>
						<p className="whitespace-pre-wrap">{data?.Content}</p>
					</div>
				</div>
			)}
			{editContent && (
				<FeedbackForm
					detailsData={detailsData}
					defaultData={data}
					onRefresh={onRefresh}
					onOpen={() => setShowPop('')}
					setEditContent={setEditContent}
				/>
			)}
			{data?.IsOwner && (
				<div>
					{!editContent && detailsData?.Status !== FEEDBACK_STATUS.done && (
						<Popover
							open={showPop == data.Id}
							onOpenChange={(event) => setShowPop(event ? data.Id : null)}
							placement="right"
							trigger="click"
							content={() => {
								return (
									<>
										{/* {getPerReal(permission, 'FeedbackReply-UpdateItem') && ( */}
										<button onClick={() => onEditContent()} className="flex items-center gap-2 text-primary font-medium">
											<FiEdit />
											<p>Chỉnh sửa</p>
										</button>
										<hr className="border-[#00000014] my-2" />
										<Popconfirm onConfirm={() => mutationDelete.mutateAsync(data.Id)} placement="left" title={`Xóa?`}>
											<button className="flex items-center gap-2 text-danger font-medium">
												<FiTrash2 />
												<p>Xóa</p>
											</button>
										</Popconfirm>
									</>
								)
							}}
						>
							<button className="p-1 hover:bg-gray-100 rounded">
								<FiMoreHorizontal size={18} />
							</button>
						</Popover>
					)}
				</div>
			)}
		</div>
	)
}

export default FeedbackItem
