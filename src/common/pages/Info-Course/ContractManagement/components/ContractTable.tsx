import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { contractApi } from '~/api/contract'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import ContractModal from './ContractModal'

type TContractTable = {
	total: number
	loading: boolean
	onChangePage: any
	data: IContract[]
	refreshData: any
} & Omit<IPrimaryTable, 'columns'>

const ContractTable: React.FC<TContractTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{
			title: 'Tên bảng điểm',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
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
