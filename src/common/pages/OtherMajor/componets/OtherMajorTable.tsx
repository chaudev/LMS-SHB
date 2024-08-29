import { useMutation } from '@tanstack/react-query'
import React from 'react'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import OtherMajorModal from './OtherMajorModal'
import { otherMajorApi } from '~/api/other-major'

type TOtherMajorTable = {} & TMyTable

const OtherMajorTable: React.FC<TOtherMajorTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{
			title: 'Tên ngành',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Chức năng',
			align: 'center',
			width: 120,
			render: (text, data, index) => (
				<div className="flex">
					<OtherMajorModal defaultData={data} refreshData={refreshData} />
					<DeleteTableRow text={`${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: number) => {
			return otherMajorApi.delete(id)
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

export default OtherMajorTable
