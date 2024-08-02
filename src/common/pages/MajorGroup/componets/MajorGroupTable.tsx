import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { majorGroupApi } from '~/api/major-group'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import MajorGroupModal from './MajorGroupModal'

type TMajorGroupTable = {} & TMyTable

const MajorGroupTable: React.FC<TMajorGroupTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{
			title: 'Tên nhóm ngành học',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Chức năng',
			align: 'center',
			width: 120,
			render: (text, data, index) => (
				<div className="flex">
					<MajorGroupModal defaultData={data} refreshData={refreshData} />
					<DeleteTableRow text={`${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return majorGroupApi.delete(id)
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

export default MajorGroupTable
