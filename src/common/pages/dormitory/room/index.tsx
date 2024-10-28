import { useMutation, useQuery } from '@tanstack/react-query'
import { Input, Popover } from 'antd'
import Head from 'next/head'
import { useState } from 'react'
import { Filter } from 'react-feather'
import { FaCheckCircle } from 'react-icons/fa'
import { dormitoryRoomApi } from '~/api/dormitory/dormitoryRoom'
import appConfigs from '~/appConfig'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNoti } from '~/common/utils'
import { ModalCUDormitoryRoom } from './com/ModalCreateUpdate'
import { RoomFilter } from './com/RoomFilter'

const DormitoryRoomIndex = () => {
	const [dataRender, setDataRender] = useState<TDormitoryRoom[]>([])
	const [filters, setFilters] = useState<TDormitoryRoomFilter>({
		PageIndex: 1,
		PageSize: 20,
		Search: ''
	})

	const handleFetching = async () => {
		try {
			const response = await dormitoryRoomApi.getAll(filters)
			const data = response.data.data
			setDataRender(data || [])
			return data
		} catch (error) {
			ShowNoti('error', error?.message)
		}
	}

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: [dormitoryRoomApi.keyGetAll, [filters.PageIndex, filters.Search, filters.DormitoryId, filters.DormitoryAreaId]],
		queryFn: handleFetching,
		refetchOnWindowFocus: false
	})

	const mutationDelete = useMutation({
		mutationKey: [dormitoryRoomApi.keyDelete],
		mutationFn: async (id: number) => await dormitoryRoomApi.delete(id),
		onSuccess: () => {
			ShowNoti('success', 'Xóa thành công!')
			refetch()
		},
		onError: (error) => ShowNoti('error', error?.message)
	})

	const columns = [
		{
			dataIndex: 'Code',
			title: 'Mã phòng'
		},
		{
			dataIndex: 'Name',
			title: 'Tên phòng'
		},
		{
			dataIndex: 'DormitoryName',
			title: 'Tên ký túc xá',
			render: (name: string) => <div className="min-w-[100px]">{name}</div>
		},
		{
			dataIndex: 'DormitoryAreaName',
			title: 'Tên khu',
			render: (name: string) => <div className="min-w-[100px]">{name}</div>
		},
		{
			dataIndex: 'IsUse',
			title: 'Đang sử dụng',
			render: (isUse: boolean) => {
				return (
					<div className="min-w-[100px] text-center">
						<FaCheckCircle color={isUse ? 'green' : '#d0d0d0'} size={18}/>
					</div>
				)
			}
		},
		{
			dataIndex: 'Description',
			title: 'Mô tả'
		},
		{
			dataIndex: 'action',
			title: '',
			render: (_, record: TDormitoryRoom) => (
				<div>
					<ModalCUDormitoryRoom defaultData={record} refetch={refetch} />
					<DeleteTableRow text={`Khu: ${record?.Name}`} handleDelete={() => mutationDelete.mutateAsync(record.Id)} />
				</div>
			)
		}
	]

	const handleFilter = (newFilter: TDormitoryListFilter) => {
		setFilters({ ...filters, ...newFilter })
	}

	return (
		<>
			<Head>
				<title>{appConfigs.appName} | Phòng ký túc xá</title>
			</Head>
			<ExpandTable
				loading={isLoading || isFetching}
				TitleCard={
					<div className="flex gap-[8px]">
						<Popover
							placement="bottomLeft"
							overlayClassName={`filter-popover`}
							trigger={'click'}
							content={<RoomFilter baseFilter={filters} handleFilter={handleFilter} />}
						>
							<button className="btn btn-secondary light btn-filter">
								<Filter />
							</button>
						</Popover>
						<Input.Search
							className="primary-search max-w-[250px] "
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
				Extra={<ModalCUDormitoryRoom defaultData={null} refetch={refetch} />}
				currentPage={filters.PageIndex}
				totalPage={filters.TotalPage && filters.TotalPage}
				dataSource={dataRender}
				columns={columns}
			/>
		</>
	)
}

export default DormitoryRoomIndex
