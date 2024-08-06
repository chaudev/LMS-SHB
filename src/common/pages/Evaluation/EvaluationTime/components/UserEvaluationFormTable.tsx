import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { userEvaluationFormApi } from '~/api/user-evaluation'
import NestedTable from '~/common/components/Primary/Table/NestedTable'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import UserEvaluationForm from './UserEvaluationForm'
import { EVALUATION_TYPES, USER_EVALUATION_FORM_STATUS } from '~/common/utils/constants'
import PrimaryTag from '~/common/components/Primary/Tag'
import Link from 'next/link'
import IconButton from '~/common/components/Primary/IconButton'
import { getDate } from '~/common/utils/super-functions'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IUserEvaluationFormTable {
	evaluationTimeId: number
}

const UserEvaluationFormTable: React.FC<IUserEvaluationFormTable> = (props) => {
	const { evaluationTimeId } = props
	const [pageFilter, setPageFilter] = useState({ pageIndex: 1, pageSize: PAGE_SIZE })

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-user-evaluation-form', evaluationTimeId, pageFilter],
		queryFn: () => {
			return userEvaluationFormApi
				.getAll({ evaluationTimeId: evaluationTimeId, pageIndex: pageFilter.pageIndex, pageSize: pageFilter.pageSize })
				.then((res) => res.data)
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: !!evaluationTimeId
	})

	const columns = [
		{
			title: 'Nhân viên',
			dataIndex: 'FullName',
			render: (value, item: TUserEvaluationForm) => {
				return (
					<p>
						{value} - {item?.UserCode}
					</p>
				)
			}
		},
		{
			title: 'Trạng thái',
			dataIndex: 'Status',
			render: (value) => {
				return (
					<div>
						{value == USER_EVALUATION_FORM_STATUS.waiting && <PrimaryTag color="yellow">Chờ đánh giá</PrimaryTag>}
						{value == USER_EVALUATION_FORM_STATUS.done && <PrimaryTag color="green">Đã đánh giá</PrimaryTag>}
					</div>
				)
			}
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'CreatedOn',
			render: (value) => {
				return <p>{getDate(value).stringDate}</p>
			}
		},
		{
			title: 'Người đánh giá',
			dataIndex: 'AssessorName',
			render: (value) => {
				return <p className="font-medium !text-primary">{value}</p>
			}
		},
		{
			title: '',
			fixed: 'right',
			render: (value, item: TUserEvaluationForm) => {
				return (
					<div className="flex items-center">
						{item.Status == USER_EVALUATION_FORM_STATUS.waiting && (
							<Link href={`/evaluation/evaluation-time/detail?id=${item?.Id}`}>
								<a>
									<IconButton type="button" color="blue" icon="document" tooltip="Đánh giá" />
								</a>
							</Link>
						)}

						{item.Status == USER_EVALUATION_FORM_STATUS.done && (
							<Link href={`/evaluation/evaluation-time/detail?id=${item?.Id}`}>
								<a>
									<IconButton type="button" color="blue" icon="eye" tooltip="Xem đánh giá" />
								</a>
							</Link>
						)}

						<DeleteTableRow text={`phiếu đánh giá của ${item?.FullName || ''}`} handleDelete={() => mutationDelete.mutateAsync(item.Id)} />
					</div>
				)
			}
		}
	]

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return userEvaluationFormApi.delete(id)
		},
		onSuccess(data, variables, context) {
			refetch()
			ShowNostis.success('Đã xóa')
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	return (
		<div className="mt-2">
			<UserEvaluationForm evaluationTimeId={evaluationTimeId} refreshData={refetch} />
			<div className="row">
				<div className="col-md-9">
					<NestedTable
						currentPage={pageFilter.pageIndex}
						totalPage={data?.totalRow || 0}
						pageSize={pageFilter.pageSize}
						loading={isLoading}
						getPagination={(pageIndex) => setPageFilter({ ...pageFilter, pageIndex: pageIndex })}
						addClass="basic-header"
						dataSource={data?.data || []}
						columns={columns}
						haveBorder={true}
					/>
				</div>
			</div>
		</div>
	)
}

export default UserEvaluationFormTable
