import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, Divider, Empty, Skeleton } from 'antd'
import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { feedbackApi } from '~/api/feedback-list'
import PrimaryButton from '~/common/components/Primary/Button'
import PrimaryTag from '~/common/components/Primary/Tag'
import { ShowNostis } from '~/common/utils'
import { FEEDBACK_STATUS } from '~/common/utils/constants'
import { isNullOrEmptyOrUndefined, ShowErrorToast } from '~/common/utils/main-function'
import { getDate } from '~/common/utils/super-functions'
import FeedbackForm from './components/FeedbackForm'
import { feedbackReplyApi } from '~/api/feedback-reply'
import FeedbackItem from './components/FeedbackItem'
import Avatar from '~/common/components/Avatar'
import MyRate from '~/atomic/atoms/MyRate'
import { PrimaryTooltip } from '~/common/components'

interface IFeedbackContent {
	loading: boolean
	data: TFeedbackDetail
	onRefresh: Function
}

const FeedbackContent: React.FC<IFeedbackContent> = (props) => {
	const { loading, data, onRefresh } = props
	const getTagStatus = (status) => {
		switch (status) {
			case FEEDBACK_STATUS.sent:
				return (
					<PrimaryTag color="blue" className="text-sm">
						Mới gửi
					</PrimaryTag>
				)
			case FEEDBACK_STATUS.processing:
				return (
					<PrimaryTag color="yellow" className="text-sm">
						Đang xử lý
					</PrimaryTag>
				)
			case FEEDBACK_STATUS.done:
				return (
					<PrimaryTag color="green" className="text-sm">
						Đã xong
					</PrimaryTag>
				)
			default:
				break
		}
	}

	const mutateDoneFeedback = useMutation({
		mutationKey: ['DONE-FEEDBACK'],
		mutationFn: (id: any) => feedbackApi.doneFB(id),
		onSuccess(data, variables, context) {
			onRefresh()
			ShowNostis.success('Đã đóng phản hồi')
		},
		onError(error, variables, context) {
			ShowErrorToast(error)
		}
	})

	const { data: feedbackList, isLoading: isLoadingFeedbackList } = useQuery({
		queryKey: ['get-feedback-list', data?.Id],
		queryFn: () => {
			return feedbackReplyApi
				.get({ pageIndex: 1, pageSize: 9999, feedbackId: data?.Id })
				.then((res) => res.data.data)
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: !!data?.Id
	})

	const mutateVote = useMutation({
		mutationKey: ['VOTE-FEEDBACK'],
		mutationFn: (stars: any) =>
			feedbackApi.rating({
				Id: data?.Id,
				StarRating: stars
			}),
		onSuccess(data, variables, context) {
			onRefresh()
			ShowNostis.success('Đánh giá thành công')
		},
		onError(error, variables, context) {
			ShowErrorToast(error)
		}
	})

	const handleCloseFeedback = () => {
		if (
			window.confirm('Xác nhận hoàn tất phản hồi? Phản hồi này sẽ chuyển về trạng thái Đã xong và không thể thêm hay chỉnh sửa được nữa')
		) {
			mutateDoneFeedback.mutateAsync(data?.Id)
		}
	}

	return (
		<Card className="w-full h-fit shadow-md">
			{!loading && !!data ? (
				<div className="py-3">
					<div className="flex items-center justify-between flex-wrap gap-4">
						<div className="flex items-center gap-2 px-3 py-1 rounded-[6px] bg-primaryExtraLight !text-primary border !border-primary">
							<FiCalendar className="text-[16px]" /> {getDate(data?.CreatedOn).full}
						</div>

						<p className="font-bold">
							Nhóm phản hồi: <span className="!text-primary">{data?.FeedbackGroupName}</span>
						</p>

						<div className="flex items-center gap-2">
							{data?.Status == FEEDBACK_STATUS.processing && (
								<PrimaryButton
									onClick={() => handleCloseFeedback()}
									icon="check"
									background="primary"
									type="button"
									loading={mutateDoneFeedback.isPending}
									disable={mutateDoneFeedback.isPending}
								>
									<p className="font-medium">Hoàn tất phản hồi</p>
								</PrimaryButton>
							)}
						</div>
					</div>

					{/* reply content */}
					<div className="mt-5 mb-10">
						<div className="flex gap-4">
							<div className="flex flex-col items-center max-w-[200px]">
								<Avatar uri={data?.IsIncognito ? '/images/incognito.png' : data?.Avatar} className="h-24 w-24 object-cover rounded-[6px]" />
								<p className="font-[700] text-[16px] !text-primary">{!data?.IsIncognito ? data?.CreatedBy : 'Ẩn danh'}</p>
							</div>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									{getTagStatus(data?.Status)}{' '}
									{data?.IsPriority && (
										<PrimaryTag color="red" className="text-sm">
											Ưu tiên
										</PrimaryTag>
									)}
									<PrimaryTooltip
										id={`rate-${data?.Id}`}
										content={`${data?.Status !== FEEDBACK_STATUS.done ? 'Chưa thể đánh giá' : 'Đánh giá phản hồi'}`}
										place="right"
									>
										<MyRate
											value={data?.StarRating}
											allowClear={false}
											disabled={
												// currentRole?.code.toLowerCase() == 'dev' ||
												// currentRole?.code.toLowerCase() == 'qtv' ||
												data?.Status !== FEEDBACK_STATUS.done || mutateVote?.isPending
											}
											onChange={(e) => mutateVote.mutateAsync(e)}
											className="text-[20px]"
										/>
									</PrimaryTooltip>
								</div>
								<p className="text-[20px] font-bold mb-2 mt-1 text-gray-500">{data?.Title}</p>
								<p>{data?.Content}</p>
							</div>
						</div>
					</div>
					<Divider>Phản hồi</Divider>
					{feedbackList?.length > 0 && (
						<div className="divide-y divide-dashed px-0 mt-2 mb-10">
							{feedbackList?.map((item) => (
								<div key={item.Id}>
									<FeedbackItem detailsData={data} data={item} onRefresh={onRefresh} />
								</div>
							))}
						</div>
					)}
					{!isLoadingFeedbackList && isNullOrEmptyOrUndefined(feedbackList) && (
						<Empty description="Chưa có phản hồi nào" className="mb-4" />
					)}
					{data?.Status !== FEEDBACK_STATUS.done && <FeedbackForm detailsData={data} onRefresh={onRefresh} />}
				</div>
			) : (
				<div className="py-3">
					<Skeleton active round />
				</div>
			)}
		</Card>
	)
}

export default FeedbackContent
