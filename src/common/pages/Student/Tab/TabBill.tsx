import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { billApi } from '~/api/bill'
import PrimaryTable from '~/common/components/Primary/Table'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { parseToMoney } from '~/common/utils/common'
import { BillDetail } from '../BillDetail'
import PrimaryTag from '~/common/components/Primary/Tag'

type ITabBill = {
	StudentDetail: IUserResponse
}

let pageIndex = 1
export const TabBill: React.FC<ITabBill> = ({ StudentDetail }) => {
	const [isLoading, setIsLoading] = useState({ type: '', status: false })
	const initParameters = { studentIds: StudentDetail?.UserInformationId, pageIndex: 1, pageSize: PAGE_SIZE }
	const [apiParameters, setApiParameters] = useState(initParameters)
	const [totalRow, setTotalRow] = useState(1)
	const [dataTable, setDataTable] = useState([])
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
						<span className="font-[500] text-[#002456]">{item.Code}</span>
					</p>
					<p>
						<span className="font-[400] text-gray">Người thanh toán: </span>
						<span className="font-[600] text-[#002456]">{value}</span>
					</p>
				</>
			)
		},
		// {
		// 	title: 'Mã khuyến mãi',
		// 	width: 150,
		// 	dataIndex: 'DiscountCode'
		// },
		{
			title: 'Giảm giá',
			width: 150,
			dataIndex: 'Reduced',
			render: (text) => <>{parseToMoney(text)}₫</>
		},

		{
			title: 'Tổng số tiền',
			dataIndex: 'TotalPrice',
			width: 116,
			render: (value, item) => <p className="font-[600] text-[#000]">{parseToMoney(value)}₫</p>
		},
		{
			title: 'Đã thanh toán',
			dataIndex: 'Paid',
			width: 126,
			render: (value, item) => <p className="font-[600] text-[#388E3C]">{parseToMoney(value)}₫</p>
		},
		{
			title: 'Chưa thanh toán',
			dataIndex: 'Debt',
			width: 140,
			render: (value, item) => <p className="font-[600] text-[#E53935]">{parseToMoney(value)}₫</p>
		},
		{
			title: 'Loại',
			dataIndex: 'Type',
			width: 200,
			render: (value, item) => {
				let color = ['green', 'blue', 'red', 'yellow', 'primary']
				return (
					<>
						{value == 1 && <PrimaryTag color={'green'}>{item?.TypeName}</PrimaryTag>}
						{value == 2 && <PrimaryTag color={'blue'}>{item?.TypeName}</PrimaryTag>}
						{value == 3 && <PrimaryTag color={'red'}>{item?.TypeName}</PrimaryTag>}
						{value == 4 && <PrimaryTag color={'yellow'}>{item?.TypeName}</PrimaryTag>}
						{value == 5 && <PrimaryTag color={'primary'}>{item?.TypeName}</PrimaryTag>}
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
					<p className="font-[600] text-[#002456]">{value}</p>
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
		<>
			<ExpandTable
				currentPage={currentPage}
				totalPage={totalRow && totalRow}
				getPagination={(pageNumber: number) => getPagination(pageNumber)}
				loading={isLoading}
				dataSource={dataTable}
				columns={columns}
				expandable={expandedRowRender}
			/>
		</>
	)
}
