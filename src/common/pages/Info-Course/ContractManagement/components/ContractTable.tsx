import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { contractApi } from '~/api/contract'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import ContractModal from './ContractModal'
import { getDate } from '~/common/utils/super-functions'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import IconButton from '~/common/components/Primary/IconButton'
import ContractUploadFileButton from './ContractUploadFileButton'
import { Popconfirm } from 'antd'

type TContractTable = { isCanEdit: boolean } & TMyTable

const ContractTable: React.FC<TContractTable> = (props) => {
	const { refreshData, isCanEdit, data, loading } = props
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
			title: 'Chương trình học',
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
								<ContractUploadFileButton contractData={data} refetch={refreshData} />
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

	const mutationDeleteFile = useMutation({
		mutationFn: (data: IContract) => {
			return contractApi.update(data)
		},
		onSuccess(data, variables, context) {
			!!refreshData && refreshData()
			ShowNostis.success('Xóa file thành công')
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	const expandedRowRender = (data: IContract) => {
		return (
			<div className="ml-[16px] mt-2">
				<div className="font-medium mb-[8px]">Tệp đã tải lên:</div>
				{!data?.Files?.length ? (
					'-'
				) : (
					<div className="flex flex-col w-fit gap-[4px] ml-4 mb-2">
						{data?.Files?.map((item) => {
							return (
								<div className="flex-1 flex items-center justify-between gap-4 pb-[4px] border-b border-[#cdcdcd]">
									<div>{item.FileName}</div>
									<div className="flex items-center gap-2">
										<IconButton
											color="blue"
											type="button"
											icon="download"
											className="m-0"
											tooltip="Tải file"
											onClick={() => window.open(item.Link)}
										/>

										<Popconfirm
											title="Bạn có chắc muốn xóa file này?"
											okText="Có"
											cancelText="Hủy"
											onConfirm={() => {
												const { Files, FileString, ...restData } = data
												mutationDeleteFile.mutate({ ...restData, Files: Files.filter((fileItem) => fileItem.Link !== item.Link) })
											}}
											disabled={mutationDeleteFile.isPending}
										>
											<IconButton type="button" icon="remove" color="red" className="m-0" tooltip="Xóa file" loading={loading} />
										</Popconfirm>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		)
	}

	return (
		<div>
			<ExpandTable columns={columns} expandable={expandedRowRender} dataSource={data} {...props} />
		</div>
	)
}

export default ContractTable
