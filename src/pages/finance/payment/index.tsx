import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { MainLayout } from '~/common'
import PayForm from '~/common/components/Finance/Payment/pay'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'
import { checkIncludesRole, parseToMoney } from '~/common/utils/common'
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
import PrimaryTag from '~/common/components/Primary/Tag'
import { PrimaryTooltip } from '~/common/components'
import Link from 'next/link'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

const initParamters = { pageSize: PAGE_SIZE, pageIndex: 1, search: '', fromDate: null, toDate: null, studentIds: null, branchIds: null }
const PaymentManagementPage = () => {
	const userInformation = useSelector((state: RootState) => state.user.information)
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
		},
		{
			name: 'type',
			title: 'Loại thanh toán',
			col: 'col-span-2',
			type: 'select',
			optionList: [
				// {
				// 	value: 1,
				// 	title: 'Đăng ký học'
				// },
				// {
				// 	value: 2,
				// 	title: 'Mua dịch vụ'
				// },
				// {
				// 	value: 3,
				// 	title: 'Đăng ký lớp dạy kèm'
				// },
				{
					value: 4,
					title: 'Tạo thủ công'
				},
				{
					value: 5,
					title: 'Thanh toán học phí'
				},
				{
					value: 6,
					title: 'Đăng ký KTX'
				}
			]
		},
		{
			name: 'unPaid',
			title: 'Trạng thái thanh toán',
			col: 'col-span-2',
			type: 'select',
			optionList: [
				{
					value: 0,
					title: 'Thanh toán thiếu'
				},
				{
					value: 1,
					title: 'Đã thanh toán đủ'
				},
				{
					value: 2,
					title: 'Thanh toán dư'
				}
			]
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
			}
			if (res.status === 204) {
				setData([])
				setTotalPage(0)
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
		console.log('listFilter', listFilter)

		const params = {
			pageIndex: 1,
			...filters,
			studentIds: listFilter.studentIds,
			branchIds: listFilter.branchIds,
			fromDate: listFilter.date ? moment(listFilter.date[0].toDate()).format('YYYY-MM-DD') : null,
			toDate: listFilter.date ? moment(listFilter.date[1].toDate()).format('YYYY-MM-DD') : null,
			type: listFilter.type,
			unPaid: listFilter.unPaid
		}
		console.log('filters ', filters)
		console.log('params ', params)

		setFilter(params)
	}
	const expandedRowRender = (item) => {
		return <BillDetails bill={item} />
	}

	// 	<PrimaryTooltip content="Thông tin học viên" place="left" id={`view-st-${item?.UserInformationId}`}>
	// 	<Link
	// 		href={{
	// 			pathname: '/info-course/student/detail',
	// 			query: { StudentID: item?.UserInformationId }
	// 		}}
	// 	>
	// 		<a>
	// 			<ButtonEye className="mr-2" />
	// 		</a>
	// 	</Link>
	// </PrimaryTooltip>
	const columns = [
		// {
		// 	title: 'Mã',
		// 	fixed: 'left',
		// 	dataIndex: 'Code',
		// 	width: 100
		// },
		{
			title: 'Thông tin thanh toán',
			dataIndex: 'FullName',
			width: 250,
			fixed: 'left',
			render: (value, item) => (
				<>
					<p>
						<span className="font-[400] text-gray">Mã thanh toán: </span>
						<span className="font-[500] text-[#B32025]">{item.Code}</span>
					</p>
					<PrimaryTooltip content="Thông tin học viên" place="left" id={`view-st-${item?.StudentId}`}>
						<p>
							<span className="font-[400] text-gray">Người thanh toán: </span>
							<span className="font-[600] text-[#B32025]">
								<Link
									href={{
										pathname: '/info-course/student/detail',
										query: { StudentID: item?.StudentId }
									}}
								>
									<a>{value}</a>
								</Link>
							</span>
						</p>
					</PrimaryTooltip>
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
			align: 'right',
			width: 126,
			render: (value, item) => <p className="font-[600] text-[#388E3C]">{parseToMoney(value)}₫</p>
		},
		{
			title: 'Chưa thanh toán',
			dataIndex: 'Debt',
			align: 'right',
			width: 140,
			render: (value, item) => <p className="font-[600] text-[#E53935]">{parseToMoney(value)}₫</p>
		},
		// {
		// 	title: 'Phương thức',
		// 	dataIndex: 'PaymentMethodName',
		// 	width: 130
		// },
		{
			title: 'Loại',
			dataIndex: 'Type',
			width: 200,
			render: (value, item) => (
				<>
					{value == 1 && <PrimaryTag color={'green'}>{item?.TypeName}</PrimaryTag>}
					{value == 2 && <PrimaryTag color={'blue'}>{item?.TypeName}</PrimaryTag>}
					{value == 3 && <PrimaryTag color={'red'}>{item?.TypeName}</PrimaryTag>}
					{value == 4 && <PrimaryTag color={'yellow'}>{item?.TypeName}</PrimaryTag>}
					{value == 5 && <PrimaryTag color={'primary'}>{item?.TypeName}</PrimaryTag>}
					{value == 6 && <PrimaryTag color={'orange'}>{item?.TypeName}</PrimaryTag>}
				</>
			)
		},
		{
			title: 'Hình thức đóng tiền',
			dataIndex: 'PaymentTypeName',
			width: 220
		},
		{
			title: 'Người tạo',
			dataIndex: 'ModifiedBy',
			width: 220,
			render: (value, item) => <p className="font-[600] text-[#B32025]">{value}</p>
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
					{checkIncludesRole(listPermissionsByRoles.finance.paymentManagement.makePayment, Number(userInformation?.RoleId)) && (
						<PayForm isEdit defaultData={item} onRefresh={getData} />
					)}
					{checkIncludesRole(listPermissionsByRoles.finance.paymentManagement.refund, Number(userInformation?.RoleId)) &&
						item?.Debt < 0 && <RefundForm onRefresh={getData} item={item} />}
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

						{checkIncludesRole(listPermissionsByRoles.finance.paymentManagement.create, Number(userInformation?.RoleId)) && (
							<PaymentForm onRefresh={getData} />
						)}
					</div>
				}
				expandable={expandedRowRender}
			/>
		</>
	)
}

PaymentManagementPage.Layout = MainLayout
export default PaymentManagementPage
