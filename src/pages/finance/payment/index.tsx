import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { MainLayout } from '~/common'
import PayForm from '~/common/components/Finance/Payment/pay'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'
import BillDetails from '../../../common/components/Finance/BillDetails'
import moment from 'moment'
import Head from 'next/head'
import appConfigs from '~/appConfig'
import RefundForm from '../../../common/components/Finance/Payment/Refund'
import PaymentForm from '~/common/components/Finance/Payment/Create'
import { billApi } from '~/api/bill'
import { userInformationApi } from '~/api/user/user'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import { branchApi } from '~/api/branch'

const initParamters = { pageSize: PAGE_SIZE, pageIndex: 1, search: '', fromDate: null, toDate: null, studentIds: null, branchIds: null }
const PaymentManagementPage = () => {
	const [loading, setLoading] = React.useState(true)
	const [totalPage, setTotalPage] = React.useState(1)
	const [data, setData] = React.useState([])
	const [sumPrice, setSumPrice] = React.useState({})
	const [filters, setFilter] = React.useState(initParamters)
	const [filterList, setFilterList] = useState([
		{
			name: 'date',
			title: 'Từ ngày - đến ngày',
			col: 'col-span-2',
			type: 'date-range',
			value: null
		}
	])

	useEffect(() => {
		getData()
	}, [filters])

	useEffect(() => {
		getAllDataFilter()
	}, [])

	const handleReset = () => {
		setFilter({ ...initParamters })
	}

	async function getData() {
		setLoading(true)
		try {
			const res = await billApi.getAll(filters)

			if (res.status == 200) {
				setData(res.data.data)
				setTotalPage(res.data.totalRow)
				setSumPrice(res.data)
			} else {
				setData([])
				setTotalPage(1)
			}
			// lấy toàn bộ học viên
		} catch (error) {
			ShowNostis.error(error?.message)
		} finally {
			setLoading(false)
		}
	}

	const getAllDataFilter = async () => {
		try {
			let tempFilter = []

			const responseUser = await userInformationApi.getAllUserByRole(3)

			if (responseUser.status === 200) {
				let templ = []
				responseUser.data.data.forEach((element) => {
					templ.push({
						value: element.UserInformationId,
						title: element.FullName + ' - ' + element.UserCode
					})
				})
				tempFilter.push({
					name: 'studentIds',
					title: 'Học viên',
					type: 'select',
					col: 'col-span-2',
					optionList: templ
				})
			}

			const responseBranch = await branchApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (responseBranch.status === 200) {
				let templ = []

				responseBranch.data.data.forEach((element) => {
					templ.push({
						value: element.Id,
						title: element.Name
					})
				})
				tempFilter.push({
					name: 'branchIds',
					title: 'Chi nhánh',
					type: 'select',
					col: 'col-span-2',
					optionList: templ
				})
			}
			setFilterList([...filterList, ...tempFilter])
		} catch (error) {
			ShowNostis.error(error?.message)
		} finally {
			setLoading(false)
		}
	}
	const handleFilter = (listFilter) => {
		let formDate = null
		let toDate = null

		if (listFilter.date) {
			formDate = moment(listFilter.date[0].toDate()).format('YYYY-MM-DD')
			toDate = moment(listFilter.date[1].toDate()).format('YYYY-MM-DD')
		}
		
		const params = {
			pageIndex: 1,
			...filters,
			// ...listFilter,
			studentIds: listFilter.studentIds,
			branchIds: listFilter.branchIds,
			formDate: formDate,
			toDate: toDate
		}
		console.log(params)

		setFilter(params)
	}
	const expandedRowRender = (item) => {
		return <BillDetails bill={item} />
	}

	const columns = [
		{
			title: 'Mã',
			dataIndex: 'Code',
			width: 100
		},
		{
			title: 'Người thanh toán',
			dataIndex: 'FullName',
			width: 220,
			render: (value, item) => <p className="font-[600] text-[#002456]">{value}</p>
		},
		{
			title: 'Mã khuyến mãi',
			width: 150,
			dataIndex: 'DiscountCode'
		},
		{
			title: 'Giảm giá',
			width: 150,
			dataIndex: 'Reduced',
			render: (text) => <>{parseToMoney(text)}</>
		},

		{
			title: 'Tổng số tiền',
			dataIndex: 'TotalPrice',
			width: 116,
			render: (value, item) => <p className="font-[600] text-[#000]">{parseToMoney(value)}</p>
		},

		{
			title: 'Đã thanh toán',
			dataIndex: 'Paid',
			width: 126,
			render: (value, item) => <p className="font-[600] text-[#388E3C]">{parseToMoney(value)}</p>
		},
		{
			title: 'Chưa thanh toán',
			dataIndex: 'Debt',
			width: 140,
			render: (value, item) => <p className="font-[600] text-[#E53935]">{parseToMoney(value)}</p>
		},
		// {
		// 	title: 'Phương thức',
		// 	dataIndex: 'PaymentMethodName',
		// 	width: 130
		// },
		{
			title: 'Loại',
			dataIndex: 'Type',
			width: 180,
			render: (value, item) => (
				<p className="font-[600] text-[#E53935]">
					{value == 1 && <span className="tag blue w-full text-center">{item?.TypeName}</span>}
					{value == 2 && <span className="tag green w-full text-center">{item?.TypeName}</span>}
					{value == 3 && <span className="tag yellow w-full text-center">{item?.TypeName}</span>}
					{value == 4 && <span className="tag gray w-full text-center">{item?.TypeName}</span>}
					{value == 5 && <span className="tag blue w-full text-center">{item?.TypeName}</span>}
				</p>
			)
		},
		{
			title: 'Người tạo',
			dataIndex: 'ModifiedBy',
			width: 220,
			render: (value, item) => <p className="font-[600] text-[#002456]">{value}</p>
		},
		{
			title: 'Ngày',
			dataIndex: 'ModifiedOn',
			width: 160,
			render: (value, item) => <p>{moment(value).format('DD/MM/YYYY HH:mm')}</p>
		},
		{
			title: 'Kỳ tiếp theo',
			dataIndex: 'PaymentAppointmentDate',
			width: 130,
			render: (value, item) => <p>{!!value ? moment(value).format('DD/MM/YYYY') : ''}</p>
		},
		{
			title: '',
			dataIndex: 'Type',
			fixed: 'right',
			width: 60,
			render: (value, item) => (
				<div className="flex item-center">
					<PayForm isEdit defaultData={item} onRefresh={getData} />
					{item?.Debt < 0 && <RefundForm onRefresh={getData} item={item} />}
				</div>
			)
		}
	]

	return (
		<>
			<Head>
				<title>{appConfigs.appName} | Quản lý thanh toán</title>
			</Head>

			<ExpandTable
				currentPage={filters.pageIndex}
				totalPage={totalPage && totalPage}
				getPagination={(page: number) => setFilter({ ...filters, pageIndex: page })}
				loading={{ type: 'GET_ALL', status: loading }}
				dataSource={data}
				columns={columns}
				sumPrice={sumPrice}
				TitleCard={
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center">
							<FilterBaseVer2 handleFilter={handleFilter} dataFilter={filterList} handleReset={handleReset} />
							<Input.Search
								className="primary-search max-w-[300px]"
								onChange={(event) => {
									if (event.target.value == '') {
										setFilter({ ...filters, pageIndex: 1, search: '' })
									}
								}}
								onSearch={(event) => setFilter({ ...filters, pageIndex: 1, search: event })}
								placeholder="Tìm kiếm"
							/>
						</div>

						<PaymentForm onRefresh={getData} />
					</div>
				}
				expandable={expandedRowRender}
			/>
		</>
	)
}

PaymentManagementPage.Layout = MainLayout
export default PaymentManagementPage
