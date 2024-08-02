import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { feedbackGroupApi } from '~/api/feedback-group/feedback-group'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import FeedbackGroupModal from './FeedbackGroupModal'
import { getDate } from '~/common/utils/super-functions'

type TFeedbackGroupTable = {} & TMyTable

const FeedbackGroupTable: React.FC<TFeedbackGroupTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{
			title: 'Tên nhóm phản hồi',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Ngày tạo',
			className: 'min-w-[120px]',
			dataIndex: 'CreatedOn',
			render: (value) => <p>{getDate(value).stringDate}</p>
		},
		{
			title: 'Ngày chỉnh sửa',
			className: 'min-w-[120px]',
			dataIndex: 'ModifiedOn',
			render: (value) => <p>{getDate(value).stringDate}</p>
		},
		{
			title: 'Chức năng',
			align: 'center',
			width: 120,
			render: (text, data, index) => (
				<div className="flex">
					<FeedbackGroupModal defaultData={data} refreshData={refreshData} />
					<DeleteTableRow text={`nhóm phản hồi ${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return feedbackGroupApi.delete(id)
		},
		onSuccess(data, variables, context) {
			!!refreshData && refreshData()
			ShowNostis.success('Đã xóa')
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	return (
		<div>
			<PrimaryTable columns={columns} {...props} />
		</div>
	)
}

export default FeedbackGroupTable
