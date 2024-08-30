import { useMutation } from '@tanstack/react-query'
import React from 'react'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import IconButton from '~/common/components/Primary/IconButton'
import { useRouter } from 'next/router'
import { templateMajorApi } from '~/api/template-major'

type TMajorContractsTable = {} & TMyTable

const MajorContractsTable: React.FC<TMajorContractsTable> = (props) => {
	const { refreshData } = props
	const router = useRouter()

	const columns = [
		{
			title: 'Tên hợp đồng',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Chức năng',
			align: 'center',
			width: 120,
			render: (value, record) => (
				<div className="flex">
					<IconButton
						type="button"
						icon={'edit'}
						color="blue"
						onClick={() => {
							router.push({
								pathname: '/majors/contracts/detail',
								query: {
									id: record.Id
								}
							})
						}}
						tooltip="Xem hợp đồng"
					/>
					<DeleteTableRow text={`${record.Name}`} handleDelete={() => mutationDelete.mutateAsync(record.Id)} />
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: number) => {
			return templateMajorApi.delete(id)
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

export default MajorContractsTable
