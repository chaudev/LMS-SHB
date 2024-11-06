import { Modal } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { billApi } from '~/api/bill'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import PrimaryTag from '~/common/components/Primary/Tag'
import { useRole } from '~/common/hooks/useRole'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { parseToMoney } from '~/common/utils/common'
import { BillDetail } from '../BillDetail'

type ITabBill = {
	StudentDetail: IUserResponse
}

let pageIndex = 1
export const TabBill: React.FC<ITabBill> = ({ StudentDetail }) => {
	const [isLoading, setIsLoading] = useState({ type: '', status: false })
	const [visible, setVisible] = useState(false)
	const initParameters = { studentIds: StudentDetail?.UserInformationId, pageIndex: 1, pageSize: PAGE_SIZE }
	const [apiParameters, setApiParameters] = useState(initParameters)
	const [totalRow, setTotalRow] = useState(1)
	const [dataTable, setDataTable] = useState([])
	const [bill, setBill] = useState(null)
	const { isStudent } = useRole()
	const [currentPage, setCurrentPage] = useState(1)

	const getBill = async (params) => {
		try {
			setIsLoading({ type: 'GET_ALL', status: true })
			const res = await billApi.getAll(params)
			if (res.status === 200) {
				setDataTable(res.data.data)
				setTotalRow(res.data.totalRow)
				setIsLoading({ type: 'GET_ALL', status: false })
			}
			if (res.status === 204) {
				setIsLoading({ type: 'GET_ALL', status: true })
				setDataTable([])
			}
		} catch (error) {
			setIsLoading({ type: 'GET_ALL', status: true })
		} finally {
			setIsLoading({ type: 'GET_ALL', status: false })
		}
	}

	useEffect(() => {
		if (StudentDetail) {
			getBill(apiParameters)
		}
	}, [StudentDetail])

	const columns = [
		{
			title: 'Thông tin thanh toán',
			dataIndex: 'FullName',
			width: 250,
			render: (value, item) => (
				<>
					<p>
						<span className="font-[400] text-gray">Mã thanh toán: </span>
						<span className="font-[500] text-[#B32025]">{item.Code}</span>
					</p>
					<p>
						<span className="font-[400] text-gray">Người thanh toán: </span>
						<span className="font-[600] text-[#B32025]">{value}</span>
					</p>
				</>
			)
		},
		// {
		// 	title: 'Mã khuyến mãi',
		// 	width: 150,
		// 	dataIndex: 'DiscountCode'
		// },
		// {
		// 	title: 'Giảm giá',
		// 	width: 150,
		// 	dataIndex: 'Reduced',
		// 	align: 'right',
		// 	render: (text) => <>{parseToMoney(text)}₫</>
		// },

		{
			title: 'Tổng số tiền',
			dataIndex: 'TotalPrice',
			width: 116,
			align: 'right',

			render: (value, item) => <p className="font-[600] text-[#000]">{parseToMoney(value)}₫</p>
		},
		{
			title: 'Đã thanh toán',
			dataIndex: 'Paid',
			width: 126,
			align: 'right',

			render: (value, item) => <p className="font-[600] text-[#388E3C]">{parseToMoney(value)}₫</p>
		},
		{
			title: 'Chưa thanh toán',
			dataIndex: 'Debt',
			width: 140,
			align: 'right',

			render: (value, item) => <p className="font-[600] text-[#E53935]">{parseToMoney(value)}₫</p>
		},
		{
			title: 'Loại',
			dataIndex: 'Type',
			width: 200,
			render: (value, item) => {
				return (
					<>
						{value == 1 && <PrimaryTag color={'green'}>{item?.TypeName}</PrimaryTag>}
						{value == 2 && <PrimaryTag color={'blue'}>{item?.TypeName}</PrimaryTag>}
						{value == 3 && <PrimaryTag color={'red'}>{item?.TypeName}</PrimaryTag>}
						{value == 4 && <PrimaryTag color={'yellow'}>{item?.TypeName}</PrimaryTag>}
						{value == 5 && <PrimaryTag color={'primary'}>{item?.TypeName}</PrimaryTag>}
						{value == 6 && <PrimaryTag color={'orange'}>{item?.TypeName}</PrimaryTag>}
					</>
				)
			}
		},
		{
			title: 'Người tạo',
			dataIndex: 'ModifiedBy',
			width: 220,
			render: (value, item) => (
				<>
					<p className="font-[600] text-[#B32025]">{value}</p>
					<p>
						<span className="font-[400] text-gray">Ngày tạo: </span>
						<span>{moment(item.ModifiedOn).format('DD/MM/YYYY HH:mm')}</span>
					</p>
				</>
			)
		},
		{
			title: 'Kỳ tiếp theo',
			dataIndex: 'PaymentAppointmentDate',
			width: 130,
			render: (value, item) => <p>{!!value ? moment(value).format('DD/MM/YYYY') : ''}</p>
		}
		// {
		// 	title: '',
		// 	dataIndex: 'Type',
		// 	fixed: 'right',
		// 	width: 60,
		// 	render: (value, item) => (
		// 		<div className="flex item-center">
		// 			<PayForm isEdit defaultData={item} onRefresh={getData} />
		// 			{item?.Debt < 0 && <RefundForm onRefresh={getData} item={item} />}
		// 		</div>
		// 	)
		// }
	]

	const expandedRowRender = (data) => {
		return <BillDetail dataRow={data} />
	}
	const getPagination = (pageNumber: number) => {
		pageIndex = pageNumber
		setCurrentPage(pageNumber)
		setApiParameters({ ...apiParameters, pageIndex: pageIndex })
	}

	return (
		<div>
			{/* <div className="tablet:hidden">
				<List
					dataSource={dataTable}
					pagination={{
						onChange: (pageNumber: number) => getPagination(pageNumber),
						total: totalRow,
						size: 'small',
						pageSize: apiParameters.pageSize,
						showTotal: () => <div className="font-weight-black">Tổng cộng: {totalRow ? totalRow : 0}</div>
					}}
					renderItem={(item) => {
						return (
							<List.Item>
								<Card
									hoverable
									className="w-full"
									onClick={() => {
										setBill(item)
										setVisible(true)
									}}
								>
									<div className="d-flex justify-between">
										<div className="font-[500] text-[#B32025]">{item.Code}</div>
										<div className="text-[#B32025]">{moment(item.ModifiedOn).format('DD/MM/YYYY HH:mm')}</div>
									</div>
									<div className="border-solid border-[1px] border-[#00337A] my-[8px]"></div>
									{!isStudent && (
										<div className="d-flex mb-[4px] justify-between">
											<div className="text-gray font-[400]">Người thanh toán:&nbsp;</div>
											<div className="font-[600] ">{item.FullName}</div>
										</div>
									)}
									<div className="d-flex mb-[4px] justify-between">
										<div className="text-gray font-[400]">Tổng tiền:&nbsp;</div>
										<div className="font-[600] ">{parseToMoney(item.TotalPrice)}₫</div>
									</div>
									<div className="d-flex mb-[4px] justify-between">
										<div className="text-gray font-[400]">Đã thanh toán:&nbsp;</div>
										<div className="font-[600] text-[#388E3C]">{parseToMoney(item.Paid)}₫</div>
									</div>
									<div className="d-flex mb-[4px] justify-between">
										<div className="text-gray font-[400]">Còn lại:&nbsp;</div>
										<div className="font-[600] text-[#E53935]">{parseToMoney(item.Debt)}₫</div>
									</div>
									<div className="d-flex mb-[4px] justify-between">
										<div className="text-gray font-[400]">Kiểu thanh toán:&nbsp;</div>
										<div className="font-[600] text-[#E53935]">
											{item.Type == 1 && <PrimaryTag color={'green'}>{item?.TypeName}</PrimaryTag>}
											{item.Type == 2 && <PrimaryTag color={'blue'}>{item?.TypeName}</PrimaryTag>}
											{item.Type == 3 && <PrimaryTag color={'red'}>{item?.TypeName}</PrimaryTag>}
											{item.Type == 4 && <PrimaryTag color={'yellow'}>{item?.TypeName}</PrimaryTag>}
											{item.Type == 5 && <PrimaryTag color={'primary'}>{item?.TypeName}</PrimaryTag>}
										</div>
									</div>
									<div>{item.Note}</div>
								</Card>
							</List.Item>
						)
					}}
				/>
			</div>

			<div className="hidden tablet:flex ">
				<div className="overscroll-x-contain	"></div>
			</div> */}

			<ExpandTable
				currentPage={currentPage}
				totalPage={totalRow && totalRow}
				getPagination={(pageNumber: number) => getPagination(pageNumber)}
				loading={isLoading}
				dataSource={dataTable}
				columns={columns}
				expandable={expandedRowRender}
			/>

			<Modal
				title={
					<p>
						Chi tiết hóa đơn <span className="font-[500] text-[#B32025]">{bill?.Code ? bill.Code : ''}</span>
					</p>
				}
				centered
				open={visible}
				onCancel={() => {
					setBill(null)
					setVisible(false)
				}}
				footer={false}
			>
				<BillDetail dataRow={bill} />
			</Modal>
		</div>
	)

	// return (
	// 	<ExpandTable
	// 		currentPage={currentPage}
	// 		totalPage={totalRow && totalRow}
	// 		getPagination={(pageNumber: number) => getPagination(pageNumber)}
	// 		loading={isLoading}
	// 		dataSource={dataTable}
	// 		columns={columns}
	// 		expandable={expandedRowRender}
	// 	/>
	// )
}
