import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import Head from 'next/head'
import { useState } from 'react'
import { dormitoryAreaApi } from '~/api/dormitory/dormitoryArea'
import appConfigs from '~/appConfig'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNoti } from '~/common/utils'
import { ModalCUDormitorySecion } from './com/ModalCreateUpdate'
import MySelectDormitory from '~/atomic/molecules/MySelectDormitory'

const DormitorySectionIndex = () => {
	// const userInformation = useSelector((state: RootState) => state.user.information)
	// const router = useRouter()
	const [dataRender, setDataRender] = useState<TDormitorySection[]>([])
	const [filters, setFilters] = useState<TDormitorySectionFilter>({
		PageIndex: 1,
		PageSize: 20,
		Search: ''
	})

	const handleFetching = async () => {
		try {
			const response = await dormitoryAreaApi.getAll(filters)
			const data = response.data.data
			setDataRender(data || [])
			return data
		} catch (error) {
			ShowNoti('error', error?.message)
		}
	}

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: [dormitoryAreaApi.keyGetAll, [filters.PageIndex, filters.Search, filters.DormitoryId]],
		queryFn: handleFetching,
		refetchOnWindowFocus: false
	})

	const mutationDelete = useMutation({
		mutationKey: [dormitoryAreaApi.keyDelete],
		mutationFn: async (id: number) => await dormitoryAreaApi.delete(id),
		onSuccess: () => {
			ShowNoti('success', 'Xóa thành công!')
			refetch()
		},
		onError: (error) => ShowNoti('error', error?.message)
	})

	const columns = [
		{
			dataIndex: 'Code',
			title: 'Mã khu'
		},
		{
			dataIndex: 'Name',
			title: 'Tên khu'
		},
		{
			dataIndex: 'DormitoryName',
			title: 'Tên ký túc xá',
			render: (name) => <div className="min-w-[100px]">{name}</div>
		},
		{
			dataIndex: 'Description',
			title: 'Mô tả'
		},
		{
			dataIndex: 'action',
			title: '',
			render: (_, record) => (
				<div>
					<ModalCUDormitorySecion defaultData={record} refetch={refetch} />
					<DeleteTableRow text={`Khu: ${record?.Name}`} handleDelete={() => mutationDelete.mutateAsync(record.Id)} />
				</div>
			)
		}
	]

	return (
		<>
			<Head>
				<title>{appConfigs.appName} | Khu ký túc xá</title>
			</Head>
			<ExpandTable
				TitleCard={
					<div className="flex gap-[8px]">
						<MySelectDormitory
							onChange={(value) => {
								setFilters({ ...filters, PageIndex: 1, DormitoryId: value })
							}}
						/>
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
				Extra={<ModalCUDormitorySecion defaultData={null} refetch={refetch} />}
				currentPage={filters.PageIndex}
				totalPage={filters.TotalPage && filters.TotalPage}
				dataSource={dataRender}
				columns={columns}
			/>
		</>
	)
}

export default DormitorySectionIndex
