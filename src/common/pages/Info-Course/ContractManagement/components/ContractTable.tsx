import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { contractApi } from '~/api/contract'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import ContractModal from './ContractModal'
import { getDate } from '~/common/utils/super-functions'

type TContractTable = { isCanEdit: boolean } & TMyTable

const ContractTable: React.FC<TContractTable> = (props) => {
	const { refreshData, isCanEdit } = props
	const columns = [
		{
			title: 'Mã hợp đồng',
			className: 'min-w-[110px]',
			dataIndex: 'ContractNumber'
		},
		{
			title: 'Học viên',
			className: 'min-w-[100px]',
			dataIndex: 'StudentName'
		},
		{
			title: 'Tên hợp đồng',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Ngành học',
			className: 'min-w-[100px]',
			dataIndex: 'MajorName'
		},
		{
			title: 'Ngày ký',
			dataIndex: 'ContractSigningDate',
			className: 'min-w-[100px]',
			render: (value) => {
				return <p>{getDate(value).stringDate}</p>
			}
		},
		...(isCanEdit
			? [
					{
						title: 'Chức năng',
						align: 'center',
						width: 120,
						render: (text, data, index) => (
							<div className="flex">
								<ContractModal defaultData={data} refreshData={refreshData} />
								<DeleteTableRow text={`hợp đồng ${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
							</div>
						)
					}
			  ]
			: [])
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return contractApi.delete(id)
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

export default ContractTable
