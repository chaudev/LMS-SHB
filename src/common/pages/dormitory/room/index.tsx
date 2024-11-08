import { useMutation, useQuery } from '@tanstack/react-query'
import { Input, Popover } from 'antd'
import Head from 'next/head'
import { useState } from 'react'
import { Filter } from 'react-feather'
import { dormitoryRoomApi } from '~/api/dormitory/dormitoryRoom'
import appConfigs from '~/appConfig'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNoti } from '~/common/utils'
import { ModalCUDormitoryRoom } from './com/ModalCreateUpdate'
import { RoomFilter } from './com/RoomFilter'
import NestedTable from '~/common/components/NestedTable'

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
		queryKey: [
			dormitoryRoomApi.keyGetAll,
			[filters.PageIndex, filters.Search, filters.DormitoryId, filters.DormitoryAreaId, filters.IsFull, filters.IsUse]
		],
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
			title: 'Mã phòng',
			render: (code: string) => {
				return (
					<div className="min-w-[100px]">
						<span>{code}</span>
					</div>
				)
			}
		},
		{
			dataIndex: 'Name',
			title: 'Tên phòng',
			render: (roomName: string) => {
				return (
					<div className="min-w-[100px]">
						<span>{roomName}</span>
					</div>
				)
			}
		},
		{
			dataIndex: 'DormitoryName',
			title: 'Ký túc xá',
			render: (name: string) => <div className="min-w-[100px]">{name}</div>
		},
		{
			dataIndex: 'DormitoryAreaName',
			title: 'Tên khu',
			render: (name: string) => <div className="min-w-[100px]">{name}</div>
		},
		{
			dataIndex: 'QuantityUse',
			title: 'Số giường',
			render: (totalBeds: string) => <div className="min-w-[100px]">{totalBeds}</div>
		},
		{
			dataIndex: 'QuantityUse',
			title: 'Giường trống',
			render: (_, record: TDormitoryRoom) => {
				const emptyBeds = record.QuantityUse - record.CountUser
				return <div className="min-w-[100px]">{emptyBeds}</div>
			}
		},
		{
			dataIndex: 'Description',
			title: 'Mô tả',
			render: (text: string) => <div className="min-w-[120px]">{text}</div>
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

	const expandedRowRender = (data: TDormitoryRoom) => {
		return (
			<NestedTable
				addClass="basic-header hide-pani"
				dataSource={data?.Users}
				Extra="Danh sách học viên ở phòng này"
				columns={[
					{
						dataIndex: 'UserInformationId',
						title: 'Id'
					},
					{
						dataIndex: 'UserName',
						title: 'Học viên'
					},
					{
						dataIndex: 'UserCode',
						title: 'Mã học viên'
					},
					{
						dataIndex: 'Mobile',
						title: 'Số điện thoại'
					}
				]}
			/>
		)
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
				expandable={expandedRowRender}
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
