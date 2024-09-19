import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { feedbackPermissionApi } from '~/api/feedback-permission'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import { getDate } from '~/common/utils/super-functions'
import FeedbackPermissionModal from './FeedbackPermissionModal'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

type TFeedbackPermissionTable = {} & TMyTable

const FeedbackPermissionTable: React.FC<TFeedbackPermissionTable> = (props) => {
	const { refreshData } = props
	const userInfo = useSelector((state: RootState) => state.user.information)

	const columns = [
		{
			title: 'Chức vụ',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'RoleName'
		},
		{
			title: 'Nhóm phản hồi',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'FeedbackGroupNames',
			render: (value) => <p>{value?.map((item) => item).join(', ')}</p>
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
					{checkIncludesRole(listPermissionsByRoles.feedback.permission.update, Number(userInfo?.RoleId)) && (
						<FeedbackPermissionModal defaultData={data} refreshData={refreshData} />
					)}
					{checkIncludesRole(listPermissionsByRoles.feedback.permission.delete, Number(userInfo?.RoleId)) && (
						<DeleteTableRow text={`phân quyền phản hồi của ${data?.RoleName}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
					)}
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return feedbackPermissionApi.delete(id)
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

export default FeedbackPermissionTable
