import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import Head from 'next/head'
import { useState } from 'react'
import { dormitoryApi } from '~/api/dormitory/dormitory'
import appConfigs from '~/appConfig'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNoti } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'
import { ModalCUDormitoryList } from './com/ModalCreateUpdate'

const DormitoryListIndex = () => {
	const [dataRender, setDataRender] = useState<TDormitoryList[]>([])

	const [filters, setFilters] = useState<TDormitoryListFilter>({
		PageIndex: 1,
		PageSize: 20,
		Search: ''
	})

	const handleFetching = async () => {
		try {
			const response = await dormitoryApi.getAll(filters)
			const data = response.data.data
			setDataRender(data || [])
			return data
		} catch (error) {
			ShowNoti('error', error?.message)
		}
	}

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: [dormitoryApi.keyGetAll, [filters.PageIndex, filters.Search]],
		queryFn: handleFetching,
		refetchOnWindowFocus: false
	})

	const mutationDelete = useMutation({
		mutationKey: [dormitoryApi.keyDelete],
		mutationFn: async (id: number) => await dormitoryApi.delete(id),
		onSuccess: () => {
			ShowNoti('success', 'Xóa thành công!')
			refetch()
		},
		onError: (error) => ShowNoti('error', error?.message)
	})

	const columns = [
		{
			dataIndex: 'Code',
			title: 'Mã'
		},
		{
			dataIndex: 'Name',
			title: 'Tên ký túc xá'
		},
		{
			dataIndex: 'Fee',
			title: 'Chi phí theo tháng',
			render: (fee: number) => <div className="min-w-[150px]">{parseToMoney(fee)}</div>
		},
		{
			dataIndex: 'Description',
			title: 'Mô tả '
		},
		{
			dataIndex: 'action',
			title: '',
			render: (_, record: TDormitoryList) => (
				<div>
					<ModalCUDormitoryList defaultData={record} refetch={refetch} />
					<DeleteTableRow text={`KTX: ${record?.Name}`} handleDelete={() => mutationDelete.mutateAsync(record.Id)} />
				</div>
			)
		}
	]

	return (
		<>
			<Head>
				<title>{appConfigs.appName} | Ký túc xá</title>
			</Head>
			<ExpandTable
				TitleCard={
					<div className="flex gap-[8px]">
						{/* <Popover content={<div>Đang build nhé ...</div>}>
            <button className="btn btn-secondary light btn-filter">
              <Filter />
            </button>
          </Popover> */}
						<Input.Search
							className="primary-search max-w-[250px]"
							onChange={(event) => {
								if (event.target.value == '') {
									setFilters({ ...filters, PageIndex: 1, Search: '' })
								}
							}}
							onSearch={(event) => setFilters({ ...filters, PageIndex: 1, Search: event })}
							placeholder="Tìm kiếm"
						/>
					</div>
				}
				loading={isLoading || isFetching}
				Extra={<ModalCUDormitoryList defaultData={null} refetch={refetch} />}
				currentPage={filters.PageIndex}
				totalPage={filters.TotalPage && filters.TotalPage}
				dataSource={dataRender}
				columns={columns}
			/>
		</>
	)
}

export default DormitoryListIndex
