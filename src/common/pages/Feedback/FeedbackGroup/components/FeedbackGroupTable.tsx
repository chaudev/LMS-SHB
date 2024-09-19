import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { feedbackGroupApi } from '~/api/feedback-group/feedback-group'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import FeedbackGroupModal from './FeedbackGroupModal'
import { getDate } from '~/common/utils/super-functions'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

type TFeedbackGroupTable = {} & TMyTable

const FeedbackGroupTable: React.FC<TFeedbackGroupTable> = (props) => {
	const { refreshData } = props
	const userInfo = useSelector((state: RootState) => state.user.information)

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
					{checkIncludesRole(listPermissionsByRoles.feedback.group.update, Number(userInfo?.RoleId)) && (
						<FeedbackGroupModal defaultData={data} refreshData={refreshData} />
					)}
					{checkIncludesRole(listPermissionsByRoles.feedback.group.delete, Number(userInfo?.RoleId)) && (
						<DeleteTableRow text={`nhóm phản hồi ${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
					)}
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
