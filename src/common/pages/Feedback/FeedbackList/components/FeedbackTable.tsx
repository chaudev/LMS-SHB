import { useMutation } from '@tanstack/react-query'
import { Popconfirm } from 'antd'
import Link from 'next/link'
import React from 'react'
import { feedbackApi } from '~/api/feedback-list'
import MyRate from '~/atomic/atoms/MyRate'
import { PrimaryTooltip } from '~/common/components'
import Avatar from '~/common/components/Avatar'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import PrimaryTag from '~/common/components/Primary/Tag'
import { userInfoColumn } from '~/common/libs/columns/user-info'
import { ShowNostis } from '~/common/utils'
import { FEEDBACK_STATUS } from '~/common/utils/constants'
import { ShowErrorToast } from '~/common/utils/main-function'
import { getDate } from '~/common/utils/super-functions'

type TFeedbackTable = {} & TMyTable

const FeedbackTable: React.FC<TFeedbackTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{
			title: 'Người tạo',
			dataIndex: 'Name',
			className: 'min-w-[120px] max-w-[140px]',
			render: (value, item: TFeedbackItem) => {
				return (
					<div className="flex items-center">
						<Avatar className="h-[36px] w-[36px] rounded-full shadow-sm" uri={item?.Avatar} />
						<div className="ml-[8px]">
							<p className="font-weight-primary">{item?.CreatedBy}</p>
							<p className="text-[14px] font-[400]">{getDate(item?.CreatedOn).stringDate}</p>
						</div>
					</div>
				)
			}
		},
		{
			title: 'Tiêu đề',
			className: 'min-w-[120px] max-w-[150px] font-medium',
			dataIndex: 'Title',
			render: (value) => <p className="whitespace-pre-wrap">{value}</p>
		},
		{
			title: 'Nội dung',
			className: 'min-w-[120px] max-w-[220px]',
			dataIndex: 'Content',
			render: (value) => <p className="whitespace-pre-wrap">{value}</p>
		},
		{
			title: 'Đánh giá',
			className: 'w-[170px]',
			dataIndex: 'StarRating',
			render: (value) => <MyRate disabled value={value} />
		},
		{
			title: 'Nhóm phản hồi',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'FeedbackGroupNames',
			render: (value, item: TFeedbackItem) => (
				<div>
					<p className="font-medium mb-1">{item?.FeedbackGroupName}</p>
					{item.Status == FEEDBACK_STATUS.sent && (
						<PrimaryTag color="blue" className="text-sm">
							Mới gửi
						</PrimaryTag>
					)}
					{item.Status == FEEDBACK_STATUS.processing && (
						<PrimaryTag color="yellow" className="text-sm">
							Đang xử lý
						</PrimaryTag>
					)}
					{item.Status == FEEDBACK_STATUS.done && (
						<PrimaryTag color="green" className="text-sm">
							Đã xong
						</PrimaryTag>
					)}
				</div>
			)
		},
		{
			title: 'Chức năng',
			align: 'center',
			width: 120,
			render: (text, item: TFeedbackItem, index) => (
				<div className="flex">
					<PrimaryTooltip id={`details-${item.Id}`} content={'Chi tiết'} place="left">
						<Link href={`/feedback/list/detail/?id=${item.Id}`}>
							<a>
								<IconButton color="blue" type="button" icon="eye" />
							</a>
						</Link>
					</PrimaryTooltip>
					{item.Status == FEEDBACK_STATUS.processing && (
						<Popconfirm
							disabled={item.Status !== FEEDBACK_STATUS.processing}
							onConfirm={() => mutateDoneFeedback.mutateAsync(item.Id)}
							placement="left"
							title={`Xác nhận hoàn tất phản hồi?`}
						>
							<div>
								<PrimaryTooltip id={`done-${item.Id}`} content={'Hoàn tất phản hồi'} place="left">
									<IconButton color="green" type="button" icon="check" />
								</PrimaryTooltip>
							</div>
						</Popconfirm>
					)}
				</div>
			)
		}
	]

	const mutateDoneFeedback = useMutation({
		mutationKey: ['DONE-FEEDBACK'],
		mutationFn: (id: number) => feedbackApi.doneFB(id),
		onSuccess(data, variables, context) {
			refreshData()
			ShowNostis.success('Đã đóng phản hồi')
		}
	})

	return (
		<div>
			<PrimaryTable columns={columns} {...props} />
		</div>
	)
}

export default FeedbackTable
