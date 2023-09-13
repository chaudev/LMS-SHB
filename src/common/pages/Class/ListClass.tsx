import { Card, Form, Input, Pagination, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { ImList } from 'react-icons/im'
import { IoGrid } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { branchApi } from '~/api/branch'
import { classApi } from '~/api/class'
import { userInformationApi } from '~/api/user/user'
import ClassList from '~/common/components/Class/ClassList'
import { ClassListContent } from '~/common/components/Class/ClassListContent'
import { ListClass as ListClassContent } from '~/common/components/Class/ListClass'
import FilterBase from '~/common/components/Elements/FilterBase'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { parseSelectArray } from '~/common/utils/common'
import { RootState } from '~/store'
import { setBranch } from '~/store/branchReducer'

const listTodoApi = {
	name: null,
	status: null,
	branchIds: null,
	pageSize: PAGE_SIZE,
	pageIndex: 1,
	sort: 0,
	sortType: false,
	studentId: null,
	search: ''
}

let listFieldFilter = {
	pageIndex: 1,
	pageSize: PAGE_SIZE,
	name: null,
	status: null,
	branchIds: null,
	fromDate: null,
	toDate: null
}

const ListClass = () => {
	const [form] = Form.useForm()
	const userInformation = useSelector((state: RootState) => state.user.information)

	const [dataFilter, setDataFilter] = useState([
		{
			name: 'date-range',
			title: '',
			col: 'col-12',
			type: 'date-range',
			placeholder: '',
			value: null
		},
		{
			name: 'name',
			title: 'Tên lớp học',
			col: 'col-md-6 col-12',
			type: 'text',
			placeholder: 'Nhập tên lớp học',
			value: null
		},
		{
			name: 'status',
			title: 'Trạng thái',
			col: 'col-md-6 col-12',
			type: 'select',
			placeholder: 'Chọn trạng thái',
			value: null,
			optionList: [
				{ value: 1, title: 'Sắp diễn ra' },
				{ value: 2, title: 'Đang diễn ra' },
				{ value: 3, title: 'Kết thúc' }
			]
		},
		{
			name: 'branchIds',
			title: 'Trung tâm',
			col: 'col-12',
			type: 'select',
			mode: 'multiple',
			placeholder: 'Chọn trung tâm',
			value: null,
			optionList: []
		}
	])

	const apiParametersStudent = {
		PageSize: 9999,
		PageIndex: 1,
		RoleIds: '3',
		parentIds: userInformation?.RoleId == '8' ? userInformation.UserInformationId.toString() : ''
	}

	const [students, setStudents] = useState<{ label: string; value: string }[]>([])
	const [todoApi, setTodoApi] = useState(listTodoApi)
	const [listClass, setListClass] = useState<IClass[]>([])
	const [totalRow, setTotalRow] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const state = useSelector((state: RootState) => state)
	const dispatch = useDispatch()
	const [tabStatus, setTabStatus] = useState(null)
	const [currentStyle, setCurrentStyle] = useState(0)

	function isAdmin() {
		return userInformation?.RoleId == 1
	}

	const getAllClass = async () => {
		setIsLoading(true)
		try {
			const res = await classApi.getAll(todoApi)
			if (res.status === 200) {
				if (userInformation?.RoleId === '8') {
					if (todoApi.studentId && todoApi.studentId !== '') {
						setListClass(res.data.data)
						setTotalRow(res.data.totalRow)
					} else {
						setListClass([])
						setTotalRow(0)
					}
				} else {
					setListClass(res.data.data)
					setTotalRow(res.data.totalRow)
				}
			}
			if (res.status === 204) {
				setListClass([])
				setTotalRow(0)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const getAllBranch = async () => {
		if (isAdmin()) {
			try {
				const res = await branchApi.getAll()
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
	}

	const handleFilter = (listFilter) => {
		console.log(listFilter)

		setTabStatus(null)
		let newListFilter = { ...listFieldFilter }
		listFilter.forEach((item, index) => {
			let key = item.name
			Object.keys(newListFilter).forEach((keyFilter) => {
				if (keyFilter == key) {
					newListFilter[key] = item.value
				}
				if (key === 'status') {
					setTabStatus(item.value)
				}
			})
		})

		console.log('newListFilter', newListFilter)

		setTodoApi({
			...todoApi,
			...newListFilter,
			branchIds: !!newListFilter.branchIds ? newListFilter.branchIds.join(',') : '',
			pageIndex: 1
		})
	}

	const getUsers = async (param) => {
		try {
			const response = await userInformationApi.getAll(param)
			if (response.status == 200) {
				let temp = []
				response.data.data?.forEach((item) => {
					temp.push({ label: `${item?.FullName} - ${item.UserCode}`, value: item.UserInformationId })
				})
				setStudents(temp)
			}
			if (response.status == 204) {
				setStudents([])
			}
		} catch (error) {
			console.error(error)
		} finally {
		}
	}

	const handleReset = () => {
		setTabStatus(null)
		setTodoApi({ ...listTodoApi })
	}
	const handleChangeStudent = (val) => {
		if (val) {
			setTodoApi({ ...todoApi, studentId: val })
		} else {
			setTodoApi(listTodoApi)
		}
	}

	useEffect(() => {
		if (state.branch.Branch.length === 0) {
			getAllBranch()
		}
		if (userInformation?.RoleId === '8') {
			getUsers(apiParametersStudent)
		}
	}, [])

	useEffect(() => {
		if (state.branch.Branch.length > 0) {
			const convertData = parseSelectArray(state.branch.Branch, 'Name', 'Id')
			dataFilter[3].optionList = convertData
			setDataFilter([...dataFilter])
		}
	}, [state])

	useEffect(() => {
		getAllClass()
	}, [todoApi])

	useEffect(() => {
		if (students && students?.length > 0) {
			setTodoApi({ ...todoApi, studentId: students[0].value })
			form.setFieldValue('student', students[0].value)
		}
	}, [students])

	const getPagination = (pageNumber: number) => {
		// setCurrent(pageNumber)
		setTodoApi({
			...todoApi,
			// ...listFieldSearch,
			pageIndex: pageNumber
		})
	}

	const showTotal = () => <div className="font-weight-black">Tổng cộng: {totalRow ? totalRow : 0}</div>

	const hanskeChangeTab = (val) => {
		setTabStatus(val)
		setTodoApi({ ...todoApi, status: val })
	}

	async function handleChangeStyleSaved(e) {
		setCurrentStyle(e)
		await localStorage.setItem('proClassStyle', e + '')
	}

	return (
		<div className="wrapper-class">
			<div className="row">
				<div className="col-12">
					<div className="wrap-table">
						<Card
							title={
								<>
									<div className="list-action-table">
										<FilterBase dataFilter={dataFilter} handleFilter={handleFilter} handleReset={handleReset} />
									</div>
									<div className="list-action-button !hidden tablet:!flex">
										<div onClick={() => hanskeChangeTab(null)} className={`item   ${tabStatus == null ? 'active' : ''}`}>
											Tất cả
										</div>
										<div onClick={() => hanskeChangeTab(1)} className={`item   ${tabStatus == 1 ? 'active' : ''}`}>
											Sắp diễn ra
										</div>
										<div onClick={() => hanskeChangeTab(2)} className={`item   ${tabStatus == 2 ? 'active' : ''}`}>
											Đang diễn ra
										</div>
										<div onClick={() => hanskeChangeTab(3)} className={`item   ${tabStatus == 3 ? 'active' : ''}`}>
											Kết thúc
										</div>
									</div>
									<Input.Search
										className="primary-search max-w-[250px] ml-[8px] "
										onChange={(event) => {
											if (event.target.value == '') {
												setTodoApi({ ...listTodoApi, pageIndex: 1, search: '' })
											}
										}}
										onSearch={(event) => setTodoApi({ ...listTodoApi, pageIndex: 1, search: event })}
										placeholder="Tìm kiếm"
									/>
								</>
							}
							extra={
								<div className="flex items-center">
									{userInformation?.RoleId === '8' ? (
										<Select
											allowClear
											className="w-[200px]"
											onChange={handleChangeStudent}
											options={students}
											placeholder="Chọn học viên"
										/>
									) : (
										''
									)}

									<div className="flex items-center w3-animate-right">
										<div
											className="border-[1px] h-[32px] w-[32px] flex items-center justify-center cursor-pointer rounded-l-[4px]"
											onClick={() => handleChangeStyleSaved(0)}
											style={{
												backgroundColor: currentStyle == 0 ? '#1b73e8' : '#fff',
												borderColor: currentStyle == 0 ? '#1b73e8' : '#bdbdbd'
											}}
										>
											<ImList className="cursor-pointer" size={20} color={currentStyle == 0 ? '#fff' : '#000'} />
										</div>
										<div
											className="border-[1px] border-l-[0px] border-[#bdbdbd] h-[32px] w-[32px] flex items-center justify-center cursor-pointer rounded-r-[4px]"
											onClick={() => handleChangeStyleSaved(1)}
											style={{
												backgroundColor: currentStyle == 1 ? '#1b73e8' : '#fff',
												borderColor: currentStyle == 1 ? '#1b73e8' : '#bdbdbd'
											}}
										>
											<IoGrid className="cursor-pointer" size={16} color={currentStyle == 1 ? '#fff' : '#000'} />
										</div>
									</div>
								</div>
							}
						>
							<div className="course-list-content">
								{currentStyle == 1 ? (
									<ClassListContent
										totalRow={totalRow}
										isLoading={isLoading}
										dataSource={listClass}
										setTodoApi={setTodoApi}
										listTodoApi={listTodoApi}
										todoApi={todoApi}
										getAllClass={getAllClass}
									/>
								) : (
									<ListClassContent
										totalRow={totalRow}
										isLoading={isLoading}
										dataSource={listClass}
										setTodoApi={setTodoApi}
										listTodoApi={listTodoApi}
										todoApi={todoApi}
										getAllClass={getAllClass}
									/>
								)}

								<div className="custom-pagination my-4">
									<Pagination
										size="small"
										current={todoApi.pageIndex}
										onChange={(pageNumber) => getPagination(pageNumber)}
										total={totalRow}
										pageSize={PAGE_SIZE}
										showTotal={showTotal}
									/>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListClass
