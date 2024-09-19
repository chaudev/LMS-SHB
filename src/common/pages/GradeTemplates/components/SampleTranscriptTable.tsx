import React from 'react'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import SampleTranscriptModal from './SampleTranscriptModal'
import { useMutation } from '@tanstack/react-query'
import { sampleTranscriptApi } from '~/api/grade-templates'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import SampleTranscriptDetail from './SampleTranscriptDetail'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

type TSampleTranscriptTable = {} & TMyTable

const SampleTranscriptTable: React.FC<TSampleTranscriptTable> = (props) => {
	const { refreshData } = props
	const userInformation = useSelector((state: RootState) => state.user.information)
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
					{checkIncludesRole(listPermissionsByRoles.config.sampleTranscript.update, Number(userInformation?.RoleId)) && (
						<SampleTranscriptModal defaultData={data} refreshData={refreshData} />
					)}
					{checkIncludesRole(listPermissionsByRoles.config.sampleTranscript.delete, Number(userInformation?.RoleId)) && (
						<DeleteTableRow text={`bảng điểm ${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
					)}
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
