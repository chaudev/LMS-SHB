import { Input } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi'
import { branchApi } from '~/api/branch'
import { paymentMethodsApi } from '~/api/payment-method'
import { paymentSessionApi } from '~/api/payment-session'
import { userInformationApi } from '~/api/user/user'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { _format } from '~/common/utils/format'
import FilterBaseVer2 from '../../Elements/FilterBaseVer2'
import IconButton from '../../Primary/IconButton'
import PrimaryTable from '../../Primary/Table'
import PrimaryTag from '../../Primary/Tag'
import IncomeExpenseManagementModalCRUD from './ModalCRUD'
import DeleteTableRow from '../../Elements/DeleteTableRow'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

export interface IIncomeExpenseManagementPageProps {}

const initialParams = { pageIndex: 1, pageSize: PAGE_SIZE, Type: null, search: '' }

const initialParamsStudent = { pageIndex: 1, pageSize: PAGE_SIZE, FullName: '', RoleIds: 3 }

const initialFilter = [
	{
		name: 'date',
		title: 'Từ ngày - đến ngày',
		col: 'col-span-2',
		type: 'date-range',
		value: null
	},
	{
		name: 'type',
		title: 'Loại phiếu',
		type: 'select',
		col: 'col-span-2',
		optionList: [
			{ title: 'Tất cả', value: null },
			{ title: 'Thu', value: 1 },
			{ title: 'Chi', value: 2 }
		]
	}
]

export default function IncomeExpenseManagementPage(props: IIncomeExpenseManagementPageProps) {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const [dataSource, setDataSource] = useState<IPaymentSession[]>()
	const [dataStatistical, setDataStatistical] = useState({ income: 0, expense: 0, revenue: 0 })
	const [totalPage, setTotalPage] = useState(0)
	const [optionList, setOptionList] = useState({ branch: [], payment_method: [] })
	const [todoStudentOption, setTodoStudentOption] = useState(initialParamsStudent)
	const [optionStudent, setStudentOption] = useState<{ title: string; value: any }[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [filterList, setFilterList] = useState([])
	const [todoApi, setTodoApi] = useState(initialParams)
	const router = useRouter()
	const getDataPayment = async () => {
		setIsLoading(true)
		try {
			let res = await paymentSessionApi.getAll(todoApi)
			if (res.status == 200) {
				// @ts-ignore

				setDataStatistical({ income: res.data.totalIncome, expense: res.data.totalExpense, revenue: res.data.totalRevenue })
				setDataSource(res.data.data)
				setTotalPage(res.data.totalRow)
			}
			if (res.status == 204) {
				setDataStatistical({ income: 0, expense: 0, revenue: 0 })
				setDataSource([])
				setTotalPage(0)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getDataPayment()
	}, [todoApi])

	const columns = [
		{
			title: 'Học viên',
			width: 220,
			dataIndex: 'FullName',
			fixed: 'left',
			render: (text, item) => {
				return (
					<>
						<p className="font-weight-primary">{text}</p>
						<p className="table-row-sub-text ">
							<span className="text-black">{item.UserCode}</span>
						</p>
					</>
				)
			}
		},
		{
			width: 270,
			title: 'Trung tâm',
			dataIndex: 'BranchName',
			render: (text, item) => {
				return (
					<>
						<p className="font-weight-primary">{text}</p>
						<p className="table-row-sub-text">
							Người tạo: <span className="text-black">{item.CreatedBy}</span>
						</p>
						<p className="table-row-sub-text">
							Thời gian: <span className="text-black"> {moment(item.CreatedOn).format('DD/MM/YYYY HH:mm')}</span>
						</p>
					</>
				)
			}
		},

		{
			title: 'Giá trị',
			width: 250,
			dataIndex: 'Value',
			render: (text, item) => {
				return (
					<>
						<p className={`table-row-main-text ${item.Type == 1 ? 'text-tw-green' : 'text-tw-red'} !font-[600]`}>
							{_format.numberToPrice(text)}₫
						</p>
						<p className="table-row-sub-text">
							Phương thức: <span className="table-row-main-text text-black">{item.PaymentMethodName}</span>
						</p>
					</>
				)
			}
		},
		{
			title: 'Loại',
			width: 100,
			dataIndex: 'TypeName',
			render: (text, item) => {
				return <PrimaryTag children={<span>{text}</span>} color={item.Type == 1 ? 'green' : 'red'} />
			}
		},
		{
			title: 'Lý do',
			width: 200,
			dataIndex: 'Reason',
			render: (text) => {
				return <p className="">{text}</p>
			}
		},
		{
			title: 'Ghi chú',
			width: 200,
			dataIndex: 'Note',
			render: (text) => {
				return <p className="">{text}</p>
			}
		},
		{
			title: '',
			width: 8 - 0,
			fixed: 'right',
			dataIndex: 'Actions',
			render: (text, item) => {
				return (
					<div className="flex gap-x-4 justify-start items-center">
						<IconButton
							type="button"
							icon="print"
							color="blue"
							onClick={() => {
								router.push({
									pathname: '/finance/income-expense-management/print-payment-session',
									query: { paymentID: item.Id, Name: item.TypeName }
								})
							}}
							className=""
							tooltip="In phiếu"
						/>
						{checkIncludesRole(listPermissionsByRoles.finance.incomeAndExpenditureManagement.update, Number(userInformation?.RoleId)) && (item.BillId == 0 || item.BillId == null) && (
							<IncomeExpenseManagementModalCRUD
								handleLoadOnScrollForOptionList={handleLoadOnScrollForOptionList}
								handleSearchForOptionList={handleSearchForOptionList}
								optionStudent={optionStudent}
								dataOption={optionList}
								mode="edit"
								dataRow={item}
								onSubmit={onSubmit}
							/>
						)}
						{checkIncludesRole(listPermissionsByRoles.finance.incomeAndExpenditureManagement.delete, Number(userInformation?.RoleId)) && (
							<DeleteTableRow
								overrideText={`Bạn chắc chắn muốn xóa phiên thanh toán này?`}
								warning={`Lưu ý: không thể khôi phục sau khi xóa`}
								handleDelete={() => handleDelete(item.Id)}
							/>
						)}
					</div>
				)
			}
		}
	]

	const getOptionStudent = async () => {
		try {
			let res = await userInformationApi.getAll(todoStudentOption)
			if (res.status == 200) {
				let temp = []
				res.data.data.forEach((item) => temp.push({ title: `${item.FullName} - ${item.UserCode}`, value: item.UserInformationId }))
				setStudentOption(temp)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
		}
	}

	useEffect(() => {
		getOptionStudent()
	}, [todoStudentOption])

	const getInfoOptions = async () => {
		try {
			const [branchResponse, paymentMethodResponse] = await Promise.all([
				branchApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				paymentMethodsApi.getAll({ pageIndex: 1, pageSize: 99999 })
			])

			let tempOption = { branch: [], student: [], payment_method: [] }
			let tempFilter = []

			if (branchResponse.status == 200) {
				let temp = []
				branchResponse.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.branch = temp

				tempFilter.push({
					name: 'branchIds',
					title: 'Chi nhánh',
					type: 'select',
					col: 'col-span-2',
					optionList: temp
				})
			}

			if (paymentMethodResponse.status == 200) {
				let temp = []
				paymentMethodResponse.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.payment_method = temp
			}

			setOptionList(tempOption)
			setFilterList([...initialFilter, ...tempFilter])
		} catch (err) {}
	}

	useEffect(() => {
		getInfoOptions()
	}, [])

	const handleSearchForOptionList = (data, name) => {
		if (name == 'student') {
			if (!!data) {
				setTodoStudentOption({ ...todoStudentOption, FullName: data })
			} else {
				setTodoStudentOption(initialParamsStudent)
			}
		}
	}

	const handleLoadOnScrollForOptionList = (name) => {
		if (name == 'student') {
			setTodoStudentOption({ ...todoStudentOption, pageSize: (todoStudentOption.pageSize += 10) })
		}
	}

	const handleFilter = (data) => {
		const params = {
			pageIndex: 1,
			...todoApi,
			userId: data.userId,
			branchIds: data.branchIds,
			type: data.type,

			fromDate: data.date ? moment(data.date[0].toDate()).format('YYYY-MM-DD') : null,
			toDate: data.date ? moment(data.date[1].toDate()).format('YYYY-MM-DD') : null
		}

		setTodoApi(params)
	}
	const handleDelete = async (id) => {
		setIsLoading(true)
		try {
			let res = await paymentSessionApi.delete(id)
			if (res.status == 200) {
				getDataPayment()
				ShowNoti('success', res.data.message)
			}
			else
			{
				ShowNoti('error', res.data.message)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}
	const onSubmit = async (data) => {
		setIsLoading(true)
		try {
			let res = null

			if (data.Mode == 'add') {
				res = await paymentSessionApi.add(data)
			}

			if (data.Mode == 'edit') {
				res = await paymentSessionApi.update(data)
			}

			if (res.status == 200) {
				getDataPayment()
				ShowNoti('success', res.data.message)
				return res.status
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const renderStatistical = () => {
		return (
			<div className="statistical-contain">
				<div className="item total-income">
					<div className="text">
						<p className="name">Tổng thu</p>
						<p className="number">{_format.numberToPrice(dataStatistical.income)}₫</p>
					</div>
					<div className="icon">
						<GiReceiveMoney />
					</div>
				</div>
				<div className="item total-expense">
					<div className="text">
						<p className="name">Tổng chi</p>
						<p className="number">{_format.numberToPrice(dataStatistical.expense)}₫</p>
					</div>
					<div className="icon">
						<GiPayMoney />
					</div>
				</div>
				<div className="item total-revenue">
					<div className="text">
						<p className="name">Lợi nhuận</p>
						<p className="number">{_format.numberToPrice(dataStatistical.revenue)}₫</p>
					</div>
					<div className="icon">
						<GiTakeMyMoney />
					</div>
				</div>
			</div>
		)
	}

	return (
		<PrimaryTable
			columns={columns}
			data={dataSource}
			total={totalPage}
			onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
			loading={isLoading}
			Extra={
				checkIncludesRole(listPermissionsByRoles.finance.incomeAndExpenditureManagement.create, Number(userInformation?.RoleId)) ? (
					<IncomeExpenseManagementModalCRUD
						mode="add"
						handleSearchForOptionList={handleSearchForOptionList}
						handleLoadOnScrollForOptionList={handleLoadOnScrollForOptionList}
						onSubmit={onSubmit}
						optionStudent={optionStudent}
						dataOption={optionList}
					/>
				) : undefined
			}
			TitleCard={
				<div className="flex items-center  w-full">
					<FilterBaseVer2
						handleFilter={handleFilter}
						dataFilter={[
							...filterList,
							{
								name: 'userId',
								title: 'Học viên',
								type: 'select',
								col: 'col-span-2',
								optionList: optionStudent
							}
						]}
						handleReset={() => setTodoApi({ ...initialParams })}
					/>
					<Input.Search
						className="primary-search max-w-[300px]"
						onChange={(event) => {
							if (event.target.value == '') {
								setTodoApi({ ...initialParams, pageIndex: 1, search: '' })
							}
						}}
						onSearch={(event) => setTodoApi({ ...initialParams, pageIndex: 1, search: event })}
						placeholder="Tìm kiếm"
					/>
				</div>
			}
		>
			{dataSource && renderStatistical()}
		</PrimaryTable>
	)
}
