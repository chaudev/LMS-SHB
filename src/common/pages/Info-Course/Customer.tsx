import { Input, Popover } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { areaApi } from '~/api/area'
import { branchApi } from '~/api/branch'
import { customerAdviseApi } from '~/api/customer'
import { customerStatusApi } from '~/api/customer-status'
import { learningNeedApi } from '~/api/learning-needs'
import { purposeApi } from '~/api/purpose'
import { sourceApi } from '~/api/source'
import CustomerAdviseForm from '~/common/components/Customer/CustomerAdviseForm'
import CustomerAdvisoryMail from '~/common/components/Customer/CustomerAdvisory/CustomerAdvisoryMail'
import CustomerAdvisoryNote from '~/common/components/Customer/CustomerAdvisory/CustomerAdvisoryNote'
import CustomerStatusHistory from '~/common/components/Customer/CustomerStatusHistory'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import PrimaryButton from '~/common/components/Primary/Button'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { is, parseSelectArray } from '~/common/utils/common'
import FilterTable from '~/common/utils/table-filter'
import { RootState } from '~/store'
import { setArea } from '~/store/areaReducer'
import { setBranch } from '~/store/branchReducer'
import { setCustomerStatus } from '~/store/customerStatusReducer'
import { setLearningNeed } from '~/store/learningNeedReducer'
import { setPurpose } from '~/store/purposeReducer'
import { setSource } from '~/store/sourceReducer'
import ImportCustomer from './ImportCustomer'
import CustomerExportImport from './CustomerExportImport'

let pageIndex = 1
let dataOption = [
	{
		dataSort: {
			sort: 0,
			sortType: false
		},
		text: 'Tên Z - A'
	},
	{
		dataSort: {
			sort: 0,
			sortType: true
		},
		text: 'Tên A - Z '
	}
]
const CustomerAdvisory = () => {
	const listTodoApi = {
		search: '',
		FullName: '',
		code: '',
		customerStatusIds: '',
		branchIds: '',
		sort: 0,
		sortType: false,
		pageSize: PAGE_SIZE,
		pageIndex: pageIndex
	}
	let listFieldFilter = {
		pageIndex: 1,
		customerStatusIds: null,
		branchIds: null
	}
	let listFieldSearch = {
		pageIndex: 1,
		FullName: null
	}
	const router = useRouter()
	const dispatch = useDispatch()

	const [todoApi, setTodoApi] = useState(listTodoApi)
	const [currentPage, setCurrentPage] = useState(1)
	const [dataCustomer, setDataCustomer] = useState<ICustomerAdvise[]>()
	const [totalRow, setTotalRow] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const refVisiblePopover = useRef(null)

	const state = useSelector((state: RootState) => {
		return state
	})

	const userInformation = useSelector((state: RootState) => {
		return state.user.information
	})

	const [dataFilter, setDataFilter] = useState<any[]>([
		{
			name: 'customerStatusIds',
			title: 'Tình trạng tư vấn',
			col: 'col-span-2',
			type: 'select',
			mode: 'multiple',
			optionList: null
		},
		{
			name: 'branchIds',
			title: 'Trung tâm',
			col: 'col-span-2',
			type: 'select',
			mode: 'multiple',
			optionList: null
		}
	])

	const sale = useMemo(() => {
		if (state.saler.Saler.length > 0) {
			return parseSelectArray(state.saler.Saler, 'FullName', 'UserInformationId')
		}
	}, [state.saler])

	const customerStatus = useMemo(() => {
		if (state.customerStatus.CustomerStatus.length > 0) {
			return parseSelectArray(state.customerStatus.CustomerStatus, 'Name', 'Id')
		}
	}, [state.customerStatus])

	const source = useMemo(() => {
		if (state.source.Source.length > 0) {
			return parseSelectArray(state.source.Source, 'Name', 'Id')
		}
	}, [state.source])

	const learningNeed = useMemo(() => {
		if (state.learningNeed.LearningNeed.length > 0) {
			return parseSelectArray(state.learningNeed.LearningNeed, 'Name', 'Id')
		}
	}, [state.learningNeed])

	const purpose = useMemo(() => {
		if (state.purpose.Purpose.length > 0) {
			return parseSelectArray(state.purpose.Purpose, 'Name', 'Id')
		}
	}, [state.purpose])

	const convertBranchSelect = useMemo(() => {
		if (state.branch.Branch.length > 0) {
			const data = parseSelectArray(state.branch.Branch, 'Name', 'Id')
			setDataFilter((prev) => [{ ...prev[0] }, { ...prev[1], optionList: data }])
			return data
		}
	}, [state.branch])

	const getAllBranch = async () => {
		try {
			const res = await branchApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setBranch(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setBranch([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllArea = async () => {
		try {
			const response = await areaApi.getAll({ pageSize: 99999 })
			if (response.status === 200) {
				dispatch(setArea(response.data.data))
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}
	const getAllCustomer = async () => {
		setIsLoading(true)
		try {
			const res = await customerAdviseApi.getAll(todoApi)
			if (res.status === 200) {
				setDataCustomer(res.data.data)
				setTotalRow(res.data.totalRow)
			}
			if (res.status === 204) {
				setDataCustomer([])
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const getAllSource = async () => {
		try {
			const res = await sourceApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setSource(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setSource([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllLearningNeed = async () => {
		try {
			const res = await learningNeedApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setLearningNeed(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setLearningNeed([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllPurpose = async () => {
		try {
			const res = await purposeApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setPurpose(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setPurpose([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllCustomerStatus = async () => {
		try {
			const res = await customerStatusApi.getAll({ pageSize: 9999 })
			if (res.status === 200) {
				const convertData = parseSelectArray(res.data.data, 'Name', 'Id')
				setDataFilter((prev) => [{ ...prev[0], optionList: convertData }, { ...prev[1] }])
				dispatch(setCustomerStatus(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setCustomerStatus([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const handleDelete = async (id) => {
		try {
			const res = await customerAdviseApi.delete(id)
			if (res.status === 200) {
				setTodoApi(listTodoApi)
				ShowNoti('success', res.data.message)
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const handleFilter = (listFilter) => {
		let newListFilter = { ...listFieldFilter }
		setTodoApi({
			...listTodoApi,
			...newListFilter,
			customerStatusIds: listFilter.customerStatusIds ? listFilter.customerStatusIds.toString() : null,
			branchIds: listFilter.branchIds ? listFilter.branchIds.toString() : null,
			pageIndex: 1
		})
	}

	// HANDLE RESET
	const resetListFieldSearch = () => {
		Object.keys(listFieldSearch).forEach(function (key) {
			if (key != 'pageIndex') {
				listFieldSearch[key] = null
			}
		})
	}

	const handleReset = () => {
		setTodoApi({
			...listTodoApi,
			pageIndex: 1
		})
		setCurrentPage(1), resetListFieldSearch()
	}

	const handleSort = async (option) => {
		let newTodoApi = {
			...todoApi,
			pageIndex: 1,
			sort: option.title.sort,
			sortType: option.title.sortType
		}
		setCurrentPage(1), setTodoApi(newTodoApi)
	}

	const getPagination = (pageNumber: number) => {
		pageIndex = pageNumber
		setCurrentPage(pageNumber)
		setTodoApi({
			...todoApi,
			pageIndex: pageIndex
		})
	}

	const expandedRowRender = (data) => {
		return <CustomerAdvisoryNote setTodoApiCustomer={setTodoApi} listTodoApiCustomer={listTodoApi} customerID={data.Id} />
	}

	useEffect(() => {
		if (state.area.Area.length == 0) {
			getAllArea()
		}
		if (state.branch.Branch.length == 0) {
			getAllBranch()
		}
		if (state.source.Source.length === 0) {
			getAllSource()
		}
		if (state.learningNeed.LearningNeed.length === 0) {
			getAllLearningNeed()
		}
		if (state.purpose.Purpose.length === 0) {
			getAllPurpose()
		}
		if (state.customerStatus.CustomerStatus.length === 0) {
			getAllCustomerStatus()
		} else {
			const convertData = parseSelectArray(state.customerStatus.CustomerStatus, 'Name', 'Id')
			setDataFilter((prev) => [{ ...prev[0], optionList: convertData }, { ...prev[1] }])
		}
	}, [])

	useEffect(() => {
		getAllCustomer()
	}, [todoApi])

	const columns = [
		{
			...FilterTable({
				type: 'search',
				dataIndex: 'Code',
				handleSearch: (event) => setTodoApi({ ...listTodoApi, code: event }),
				handleReset: (event) => setTodoApi(listTodoApi)
			}),
			width: 160,
			title: 'Mã',
			dataIndex: 'Code',
			render: (text) => <p className="font-semibold">{text}</p>
		},
		{
			...FilterTable({
				type: 'search',
				dataIndex: 'FullName',
				handleSearch: (event) => setTodoApi({ ...listTodoApi, FullName: event }),
				handleReset: (event) => setTodoApi(listTodoApi)
			}),
			width: 160,
			title: 'Họ tên',
			dataIndex: 'FullName',
			render: (text) => <p className="font-weight-primary">{text}</p>
		},
		{
			// width: 240,
			title: 'Số điện thoại',
			dataIndex: 'Mobile'
		},
		{
			width: 160,
			title: 'Email',
			dataIndex: 'Email'
		},
		{
			width: 160,
			title: 'Trạng thái',
			dataIndex: 'CustomerStatusId',
			render: (id, data) => {
				switch (id) {
					case 1:
						return <p className="font-semibold tag red">{data.CustomerStatusName}</p>
						break
					case 2:
						return <p className="font-semibold tag blue">{data.CustomerStatusName}</p>
						break
					default:
						return <p className="font-semibold tag green">{data.CustomerStatusName}</p>
						break
				}
			}
		},
		{
			width: 180,
			title: 'Trung tâm',
			dataIndex: 'BranchId',
			render: (text, data) => <p className="font-semibold">{data.BranchName}</p>
		},
		{
			width: 200,
			title: 'Tư vấn viên',
			dataIndex: 'SaleId',
			render: (text, data) => <p className="font-semibold">{data.SaleName}</p>
		},
		{
			width: 160,
			title: 'Chức năng',
			dataIndex: '',
			fixed: 'right',
			responsive: ['md'],
			render: (text, data) => {
				return (
					<div className="d-flex align-items-center">
						<DeleteTableRow text={`khách hàng ${data.FullName}`} handleDelete={() => handleDelete(data.Id)} />
						<CustomerAdviseForm
							source={source}
							learningNeed={learningNeed}
							purpose={purpose}
							sale={sale}
							branch={convertBranchSelect}
							customerStatus={customerStatus}
							rowData={data}
							listTodoApi={listTodoApi}
							setTodoApi={setTodoApi}
						/>
						<CustomerAdvisoryMail dataRow={data} listTodoApi={listTodoApi} setTodoApi={setTodoApi} />
						<CustomerStatusHistory customer={data} />
						{data.CustomerStatusId !== 2 && (
							<CustomerAdviseForm
								isStudent={true}
								source={source}
								learningNeed={learningNeed}
								purpose={purpose}
								sale={sale}
								branch={convertBranchSelect}
								customerStatus={customerStatus}
								rowData={data}
								listTodoApi={listTodoApi}
								setTodoApi={setTodoApi}
							/>
						)}
					</div>
				)
			}
		},
		{
			width: 160,
			title: 'Chức năng',
			dataIndex: '',
			responsive: ['xs'],
			render: (text, data) => {
				return (
					<div className="d-flex align-items-center">
						<DeleteTableRow text={`khách hàng ${data.FullName}`} handleDelete={() => handleDelete(data.Id)} />
						<CustomerAdviseForm
							source={source}
							learningNeed={learningNeed}
							purpose={purpose}
							sale={sale}
							branch={convertBranchSelect}
							customerStatus={customerStatus}
							rowData={data}
							listTodoApi={todoApi}
							setTodoApi={setTodoApi}
						/>
						<CustomerAdvisoryMail dataRow={data} listTodoApi={todoApi} setTodoApi={setTodoApi} />
						{data.CustomerStatusId !== 2 && (
							<CustomerAdviseForm
								isStudent={true}
								source={source}
								learningNeed={learningNeed}
								purpose={purpose}
								sale={sale}
								branch={convertBranchSelect}
								customerStatus={customerStatus}
								rowData={data}
								listTodoApi={todoApi}
								setTodoApi={setTodoApi}
							/>
						)}
					</div>
				)
			}
		}
	]

	const rolePermission =
		is(userInformation).admin ||
		is(userInformation).teacher ||
		is(userInformation).manager ||
		is(userInformation).saler ||
		is(userInformation).academic

	const content = (
		<div className="flex flex-col gap-3">
			<CustomerExportImport rolePermission={rolePermission} getAllCustomer={() => getAllCustomer()} />

			{/* {rolePermission && (
				<PrimaryButton
					className="w-full btn-download"
					type="button"
					icon="download"
					background="blue"
					// onClick={() => window.open(`${appConfigs.linkDownloadExcelCustomer}?key=${new Date().getTime()}`)}
				>
					File mẫu
				</PrimaryButton>
			)}
			{rolePermission && <ImportCustomer className="w-full btn-import" onFetchData={() => getAllCustomer()} />} */}

			<PrimaryButton
				className="!w-full "
				background="orange"
				type="button"
				onClick={() => router.push({ pathname: '/info-course/customer/send-mail-all' })}
				icon="send"
			>
				Gửi thông báo
			</PrimaryButton>
			<CustomerAdviseForm
				className="!w-full"
				source={source}
				learningNeed={learningNeed}
				purpose={purpose}
				sale={sale}
				branch={convertBranchSelect}
				customerStatus={customerStatus}
				listTodoApi={listTodoApi}
				setTodoApi={setTodoApi}
				refPopover={refVisiblePopover}
			/>
		</div>
	)

	return (
		<div className="info-course-customer">
			<ExpandTable
				currentPage={currentPage}
				totalPage={totalRow && totalRow}
				pageIndex={todoApi.pageIndex}
				getPagination={(pageNumber: number) => getPagination(pageNumber)}
				loading={isLoading}
				// addClass="basic-header"
				TitlePage="Danh sách khách hàng"
				TitleCard={
					<div className="d-flex align-items-center justify-content-end">
						<FilterBaseVer2
							dataFilter={dataFilter}
							handleFilter={(listFilter: any) => {
								handleFilter(listFilter)
							}}
							handleReset={handleReset}
						/>
						<Input.Search
							className="primary-search max-w-[250px] ml-[8px] mr-3"
							onChange={(event) => {
								if (event.target.value == '') {
									setTodoApi({ ...todoApi, pageIndex: 1, search: '' })
								}
							}}
							onSearch={(event) => setTodoApi({ ...todoApi, pageIndex: 1, search: event })}
							placeholder="Tìm kiếm"
						/>
						{/* <SortBox handleSort={(value) => handleSort(value)} dataOption={dataOption} /> */}
					</div>
				}
				dataSource={dataCustomer}
				columns={columns}
				Extra={
					<div className="extra-table">
						<div className="wrap-btn-customer">
							<div className="flex">
								<CustomerExportImport rolePermission={rolePermission} getAllCustomer={getAllCustomer} />
								{/* {rolePermission && (
									<PrimaryButton
										className="mr-2 btn-download"
										type="button"
										icon="download"
										background="blue"
										// onClick={() => window.open(`${appConfigs.linkDownloadExcelCustomer}?key=${new Date().getTime()}`)}
									>
										File mẫu
									</PrimaryButton>
								)}
								{rolePermission && <ImportCustomer className="mr-1 btn-import" onFetchData={() => getAllCustomer()} />} */}

								<PrimaryButton
									background="orange"
									type="button"
									icon="send"
									onClick={() => router.push({ pathname: '/info-course/customer/send-mail-all' })}
									className="mr-2"
								>
									Gửi thông báo
								</PrimaryButton>
								<CustomerAdviseForm
									source={source}
									learningNeed={learningNeed}
									purpose={purpose}
									sale={sale}
									branch={convertBranchSelect}
									customerStatus={customerStatus}
									listTodoApi={listTodoApi}
									setTodoApi={setTodoApi}
								/>
							</div>
						</div>
						<Popover
							ref={refVisiblePopover}
							className="wrap-btn-popover-customer"
							content={content}
							title={null}
							trigger="click"
							placement="bottomRight"
						>
							<PrimaryButton background="primary" type="button">
								<BsThreeDots />
							</PrimaryButton>
						</Popover>
					</div>
				}
				expandable={expandedRowRender}
				// isResetKey={isResetKey}
			/>
		</div>
	)
}

export default CustomerAdvisory
