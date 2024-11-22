import { useRef, useState } from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { FaMoneyBill } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'

import { useDisclosure } from '~/hooks'

import { EDormitoryRegisterStatus } from '~/enums/common'

import { dormitoryRegisterApi } from '~/api/dormitory/dormitory-register'

import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNoti } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'
import { PaymentModal } from '~/common/components/Finance/Payment/PaymentModal'
import ModalViolation from '~/common/pages/dormitory/student/com/ModalViolation'
import { TYPE_PAGE } from '~/common/pages/dormitory/student/utils'
import ModalFurtherExtension from '~/common/pages/dormitory/student/com/ModalFurtherExtension'

import { HistoryRegister } from './com/HistoryRegister'
import ModalCreateUpdate from './com/ModalCreateUpdate'
import RegisterFilter from './com/RegisterFilter'
import { UpdateChooseRoom } from './com/UpdateChooseRoom'

const checkRenewalOrExpirationDate = (date: string) => {
	const inputDate = moment(date)
	const thirtyDaysAgo = inputDate.clone().subtract(30, 'days')
	const currentTime = moment()

	if (currentTime.isBetween(thirtyDaysAgo, inputDate, null, '[)')) {
		return 'NhacHan'
	} else if (currentTime.isAfter(inputDate)) {
		return 'QuaHan'
	} else {
		return 'ChuaDenHan'
	}
}
const checkDate = {
	QuaHan: {
		textColor: 'text-tw-red'
	},
	NhacHan: {
		textColor: 'text-tw-orange'
	}
}

const BoarderList = () => {
	const [dataRender, setDataRender] = useState<TDormitoryItem[]>([])

	const paymentModalController = useDisclosure()

	const [filters, setFilters] = useState<TDormitoryRegisterParams>({
		PageIndex: 1,
		PageSize: 20,
		Status: 2
	})

	const handleFetching = async () => {
		try {
			const response = await dormitoryRegisterApi.getAll(filters)
			const data = response.data.data
			setDataRender(data || [])
			return data
		} catch (error) {
			ShowNoti('error', error?.message)
		}
	}

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: [
			dormitoryRegisterApi.keyGetAll,
			[
				filters.PageIndex,
				filters.DormitoryId,
				filters.DormitoryAreaId,
				filters.DormitoryRoomId,
				filters.StudentId,
				filters.Status,
				filters.Ids,
				filters.Search
			]
		],
		queryFn: handleFetching,
		refetchOnWindowFocus: false
	})

	const mutationExportDormitory = useMutation({
		mutationKey: [dormitoryRegisterApi.keyExportDormitory],
		mutationFn: async (data: { Id: number; DateChange: string }) => await dormitoryRegisterApi.exportDormitory(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Xuất ký túc xá thành công!')
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const mutationDeleteDormitory = useMutation({
		mutationKey: [dormitoryRegisterApi.keyDelete],
		mutationFn: async (id: number) => await dormitoryRegisterApi.delete(id),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Xóa thành công!')
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const rowItem = useRef<any>()
	const handlePayment = (item) => {
		rowItem.current = item
		paymentModalController.onOpen()
	}

	const columns = [
		{
			dataIndex: 'StudentName', // StudentCode, StudentAvatar
			title: 'Học viên',
			render: (_, record: TDormitoryItem) => {
				return (
					<div className="flex items-center">
						<Avatar className="h-[36px] w-[36px] rounded-full shadow-sm" src={record?.StudentAvatar || '/default-avatar.png'} />
						<div className="ml-[8px]">
							<p className="font-weight-primary">{record?.StudentName}</p>
							<p className="text-[14px] font-[400]">{record?.StudentCode}</p>
						</div>
					</div>
				)
			}
		},
		{
			dataIndex: 'DormitoryId', // DormitoryName,  DormitoryAreaName, DormitoryRoomName
			title: 'Thông tin KTX',
			render: (_, record: TDormitoryItem) => {
				return (
					<div>
						<div className="flex items-center justify-between">
							<span>Ký túc xá:</span>
							<span>{record?.DormitoryName || '-'}</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Khu:</span>
							<span>{record?.DormitoryAreaName || '-'}</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Phòng:</span>
							<span className="text-[#b32025]">{record?.DormitoryRoomName || '-'}</span>
						</div>
					</div>
				)
			}
		},
		{
			dataIndex: 'Price',
			title: 'Chi phí',
			render: (price: number) => <div>{parseToMoney(price)}</div>
		},
		{
			dataIndex: 'StartDate',
			title: 'Thời gian lưu trú',
			render: (_, record: TDormitoryItem) => {
				const status = checkRenewalOrExpirationDate(record.EndDate)
				return (
					<div>
						<div className="flex items-center justify-between space-x-1">
							<span>Bắt đầu:</span>
							<span className="">{record?.StartDate ? moment(record?.StartDate).format('DD/MM/YYYY') : '-'}</span>
						</div>

						<div className="flex items-center justify-between space-x-1">
							<span className={checkDate[status]?.textColor}>Đến hạn:</span>
							<span className={checkDate[status]?.textColor}>{record?.EndDate ? moment(record?.EndDate).format('DD/MM/YYYY') : '-'}</span>
						</div>
					</div>
				)
			}
		},
		{
			dataIndex: 'Status',
			title: 'Trạng thái',
			render: (status: number, record: TDormitoryItem) => {
				const color = ['blue', 'green', 'yellow', 'gray']
				return <div className={`tag ${color[status - 1]}`}>{record?.StatusName}</div>
			}
		},
		{
			dataIndex: 'IsPayment',
			title: 'Thanh toán',
			render: (isPayment) => {
				return (
					<div className={`text-tw-${isPayment ? 'green' : 'red'} font-semibold`}>{isPayment ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
				)
			}
		},
		{
			dataIndex: 'action',
			title: '',
			render: (_, record: TDormitoryItem) => {
				const menu = (
					<Menu className="p-0 rounded-md shadow-md">
						{record.Status === EDormitoryRegisterStatus.TrongKhu && (
							<>
								<Menu.Item>
									<UpdateChooseRoom data={record} refetch={refetch} type="change-room" />
								</Menu.Item>

								<Menu.Item>
									<ModalFurtherExtension data={record} />
								</Menu.Item>

								<Menu.Item>
									<ModalViolation data={record} />
								</Menu.Item>

								<Menu.Item>
									<HistoryRegister domitoryRegistrationId={record.Id} />
								</Menu.Item>

								<Menu.Item>
									<DeleteTableRow
										icon={'x'}
										modalTitle="Xuất khu ký túc xá"
										title="Xuất khu ký túc xá"
										overrideText={`Bạn xác nhận xuất khu cho: ${record?.StudentName}`}
										handleDelete={() =>
											mutationExportDormitory.mutateAsync({ Id: record.Id, DateChange: moment().format('YYYY-MM-DDTHH:mm:ss.SSS') })
										}
										isDormitoryRegistrationList
									/>
								</Menu.Item>
							</>
						)}
						{record.Status === EDormitoryRegisterStatus.XuatKhu && (
							<Menu.Item>
								<HistoryRegister domitoryRegistrationId={record.Id} />
							</Menu.Item>
						)}
					</Menu>
				)
				return (
					<Dropdown overlay={menu} trigger={['click']} placement="bottomRight" className="w-10">
						<BsThreeDots className="size-5 cursor-pointer" />
					</Dropdown>
				)
			}
		}
	]

	const handleFilter = (newFilter: TDormitoryRegisterParams) => {
		setFilters({ ...filters, ...newFilter })
	}

	return (
		<>
			<ExpandTable
				TitleCard={<RegisterFilter filter={filters} handleFilter={handleFilter} typePage={TYPE_PAGE.BOARDER_LIST} />}
				loading={isLoading || isFetching}
				// Extra={<ModalCreateUpdate defaultData={null} refetch={refetch} />}
				currentPage={filters.PageIndex}
				totalPage={filters.TotalPage && filters.TotalPage}
				dataSource={dataRender}
				columns={columns}
			/>

			<PaymentModal
				onClose={paymentModalController.onClose}
				visible={paymentModalController.isOpen}
				item={{
					...rowItem.current,
					Type: 6
				}}
				onRefresh={refetch}
			/>
		</>
	)
}

export default BoarderList
