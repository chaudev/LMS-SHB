import React from 'react'
import PrimaryTable from '~/common/components/Primary/Table'
import { getDate } from '~/common/utils/super-functions'
import EvaluationTimeForm from './EvaluationForm'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import { useMutation } from '@tanstack/react-query'
import { evaluationTimeApi } from '~/api/evaluation-time'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import UserEvaluationFormTable from './UserEvaluationFormTable'

type TEvaluationTimeTable = { totalPage: number; getPagination: Function; currentPage: number } & Omit<TMyTable, 'total' | 'onChangePage'>

const EvaluationTimeTable: React.FC<TEvaluationTimeTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{
			title: 'Tên đợt đánh giá',
			className: 'min-w-[140px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Ngày đánh giá',
			className: 'min-w-[120px]',
			dataIndex: 'Date',
			render: (value) => {
				return <p>{getDate(value).stringDate}</p>
			}
		},
		{
			title: 'Phiếu đánh giá',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'SampleEvaluationFormName',
			render: (value) => {
				return <p className="!text-primary">{value}</p>
			}
		},
		{
			title: 'Đánh giá cho',
			className: 'min-w-[120px]',
			dataIndex: 'RoleName'
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
					<EvaluationTimeForm defaultData={data} refreshData={refreshData} />
					<DeleteTableRow text={`đợt đánh giá ${data?.Name || ''}`} handleDelete={() => mutationDelete.mutateAsync(data.Id)} />
				</div>
			)
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return evaluationTimeApi.delete(id)
		},
		onSuccess(data, variables, context) {
			!!refreshData && refreshData()
			ShowNostis.success('Đã xóa')
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	const expandedRowRender = (data) => {
		return <UserEvaluationFormTable evaluationTimeId={data.Id} />
	}

	return (
		<div>
			<ExpandTable dataSource={props?.data} columns={columns} {...props} expandable={expandedRowRender} />
		</div>
	)
}

export default EvaluationTimeTable