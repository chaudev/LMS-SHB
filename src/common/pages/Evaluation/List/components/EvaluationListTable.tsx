import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { evaluationApi } from '~/api/evaluation'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import { getDate } from '~/common/utils/super-functions'
import EvaluationForm from './EvaluationForm'
import Link from 'next/link'
import { ButtonEye } from '~/common/components/TableButton'
import { PrimaryTooltip } from '~/common/components'

type TEvaluationListTable = {} & TMyTable

const EvaluationListTable: React.FC<TEvaluationListTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{
			title: 'Tên phiếu',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Ngày tạo',
			className: 'min-w-[120px]',
			dataIndex: 'CreatedOn',
			render: (value) => {
				return <p>{getDate(value).stringDate}</p>
			}
		},
		{
			title: 'Ngày cập nhật',
			className: 'min-w-[120px]',
			dataIndex: 'ModifiedOn',
			render: (value) => {
				return <p>{getDate(value).stringDate}</p>
			}
		},
		{
			title: 'Chức năng',
			width: 120,
			render: (text, data: TSampleEvaluationFormItem, index) => (
				<div className="flex items-center">
					<Link href={`/evaluation/list/detail/?evaluationFormId=${data?.Id}`}>
						<a>
							<PrimaryTooltip content="Chi tiết" place="left" id={`detail-${data?.Id}`}>
								<ButtonEye className="mr-2" />
							</PrimaryTooltip>
						</a>
					</Link>
					<EvaluationForm defaultData={data} refreshData={refreshData} />
					<DeleteTableRow text={`phiếu đánh giá ${data.Name}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return evaluationApi.deleteForm(id)
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

export default EvaluationListTable
