import Link from 'next/link'
import React from 'react'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { getDate } from '~/common/utils/super-functions'

type TMyEvaluationListTable = {} & Omit<TMyTable, 'refreshData'>

const MyEvaluationListTable: React.FC<TMyEvaluationListTable> = (props) => {
	const columns = [
		{
			title: 'Đợt đánh giá',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'EvaluationTimeName'
		},
		{
			title: 'Đánh giá',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'EvaluationFormName'
		},
		{
			title: 'Người đánh giá',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'AssessorName',
			render: (value) => <p className="!text-primary">{value}</p>
		},
		{
			title: 'Ngày đánh giá',
			className: 'min-w-[120px]',
			dataIndex: 'ModifiedOn',
			render: (value) => {
				return <p>{getDate(value).stringDate}</p>
			}
		},
		{
			title: 'Xem',
			align: 'center',
			render: (text, data, index) => (
				<div className="flex justify-center">
					<Link href={`/evaluation/evaluation-time/detail?id=${data?.Id}`}>
						<a>
							<IconButton type="button" color="blue" icon="eye" tooltip="Xem đánh giá" />
						</a>
					</Link>
				</div>
			)
		}
	]

	return (
		<div>
			<PrimaryTable columns={columns} {...props} />
		</div>
	)
}

export default MyEvaluationListTable
