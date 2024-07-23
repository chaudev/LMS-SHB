import React from 'react'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import SampleTranscriptModal from './SampleTranscriptModal'
import { useMutation } from '@tanstack/react-query'
import { sampleTranscriptApi } from '~/api/grade-templates'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import SampleTranscriptDetail from './SampleTranscriptDetail'

type TSampleTranscriptTable = {
	total: number
	loading: boolean
	onChangePage: any
	data: any[]
	refreshData: any
} & Omit<IPrimaryTable, 'columns'>

const SampleTranscriptTable: React.FC<TSampleTranscriptTable> = (props) => {
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
					<SampleTranscriptDetail defaultData={data} />
					<SampleTranscriptModal defaultData={data} refreshData={refreshData} />
					<DeleteTableRow text={`bảng điểm ${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return sampleTranscriptApi.delete(id)
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

export default SampleTranscriptTable
