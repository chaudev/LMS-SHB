import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gradeApi } from '~/api/grade'
import { programApi } from '~/api/program'
import appConfigs from '~/appConfig'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import FilterBase from '~/common/components/Elements/FilterBase'
import SortBox from '~/common/components/Elements/SortBox'
import FilterColumn from '~/common/components/FilterTable/Filter/FilterColumn'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import ProgramAddTeacherForm from '~/common/components/Program/ProgramAddTeacherForm'
import ProgramForm from '~/common/components/Program/ProgramForm'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { checkIncludesRole, parseSelectArray } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import { setSpecialize } from '~/store/specializeReducer'

let pageIndex = 1

let listFieldFilter = {
	pageIndex: 1,
	gradeId: null,
	type: null
}

const dataOption = [
	{
		dataSort: {
			sort: 1,
			sortType: false
		},
		text: 'Tên Z - A'
	},
	{
		dataSort: {
			sort: 1,
			sortType: true
		},
		text: 'Tên A - Z'
	},
	{
		dataSort: {
			sort: 0,
			sortType: false
		},
		text: 'Mới - cũ'
	},
	{
		dataSort: {
			sort: 0,
			sortType: true
		},
		text: 'Cũ - mới'
	}
]

const Programs = () => {
	const [dataSource, setDataSource] = useState<IProgram[]>([])
	const { information: userInformation } = useSelector((state: RootState) => state.user)
	const state = useSelector((state: RootState) => state)
	const dispatch = useDispatch()
	const [dataFilter, setDataFilter] = useState([
		{
			name: 'gradeId',
			title: 'Trình độ tiếng',
			col: 'col-md-12 col-12',
			type: 'select',
			optionList: [],
			value: null,
			placeholder: 'Chọn Trình độ tiếng'
		}
	])
	const [isLoading, setIsLoading] = useState(false)
	const [totalPage, setTotalPage] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)

	const listTodoApi = {
		pageSize: PAGE_SIZE,
		pageIndex: pageIndex,
		sort: 0,
		sortType: false,
		Code: null,
		Name: null,
		Type: null
	}

	const [todoApi, setTodoApi] = useState(listTodoApi)

	const specialize = useMemo(() => {
		const convertData = parseSelectArray(state.specialize.Specialize, 'Name', 'Id')
		dataFilter[0].optionList = convertData
		setDataFilter(dataFilter)
		return convertData
	}, [state.specialize])

	// GET DATA SOURCE
	const getDataSource = async () => {
		setIsLoading(true)
		try {
			let res = await programApi.getAll(todoApi)
			if (res.status === 200) {
				setDataSource(res.data.data)
				setTotalPage(res.data.totalRow)
			}
			if (res.status === 204) {
				setDataSource([])
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	// GET DATA CENTER
	const getDataGrade = async () => {
		try {
			let res = await gradeApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setSpecialize(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setSpecialize([]))
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	// HANDLE FILTER
	const handleFilter = (listFilter) => {
		let newListFilter = { ...listFieldFilter }
		listFilter.forEach((item, index) => {
			let key = item.name
			Object.keys(newListFilter).forEach((keyFilter) => {
				if (keyFilter == key) {
					newListFilter[key] = item.value
				}
			})
		})
		setTodoApi({ ...listTodoApi, ...newListFilter, pageIndex: 1 })
	}

	// HANDLE SORT
	const handleSort = async (option) => {
		let newTodoApi = {
			...listTodoApi,
			pageIndex: 1,
			sort: option.title.sort,
			sortType: option.title.sortType
		}
		setCurrentPage(1), setTodoApi(newTodoApi)
	}

	// ON SEARCH
	const onSearch = (valueSearch, dataIndex) => {
		setTodoApi({ ...listTodoApi, [dataIndex]: valueSearch })
	}

	// HANDLE RESET
	const resetListFieldSearch = () => {
		Object.keys(listFieldFilter).forEach(function (key) {
			if (key != 'pageIndex') {
				listFieldFilter[key] = null
			}
		})
	}

	const handleReset = () => {
		setTodoApi({ ...listTodoApi, pageIndex: 1 })
		setCurrentPage(1), resetListFieldSearch()
	}

	const handleDelete = async (id) => {
		try {
			const res = await programApi.delete(id)
			if (res.status === 200) {
				setTodoApi(listTodoApi)
				ShowNoti('success', res.data.message)
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	// USE EFFECT - FETCH DATA
	useEffect(() => {
		getDataSource()
	}, [todoApi])

	useEffect(() => {
		if (state.specialize.Specialize.length === 0) {
			getDataGrade()
		}
	}, [])

	// COLUMN
	const columns = [
		{
			title: 'Mã Khung đào tạo',
			dataIndex: 'Code',
			className: 'font-weight-black min-w-[120px]',
			...FilterColumn('Code', onSearch, handleReset, 'text')
			// render: (value) => <span className="weight-600">{value}</span>
		},
		{
			title: 'Tên Khung đào tạo',
			dataIndex: 'Name',
			...FilterColumn('Name', onSearch, handleReset, 'text'),
			render: (text) => {
				return <p className="font-weight-primary min-w-[120px]">{text}</p>
			}
		},
		{
			title: 'Trình độ tiếng',
			dataIndex: 'GradeName',
			className: 'min-w-[120px]',
			render: (text) => {
				return <p className="font-weight-black">{text}</p>
			}
		},
		// {
		// 	title: 'Học phí',
		// 	width: 120,
		// 	dataIndex: 'Price',
		// 	render: (Price) => {
		// 		return (
		// 			<p className="font-weight-black weight-600" style={{ color: 'black' }}>
		// 				{new Intl.NumberFormat().format(Price)}
		// 			</p>
		// 		)
		// 	}
		// },
		{
			title: 'Người tạo',
			className: 'min-w-[100px]',
			dataIndex: 'ModifiedBy'
		},
		{
			title: 'Ngày tạo',
			className: 'min-w-[100px]',
			dataIndex: 'ModifiedOn',
			render: (date: any) => moment(date).format('DD/MM/YYYY')
		},
		{
			title: 'Chức năng',
			fixed: 'right',
			align: 'right',
			with: 200,
			render: (value, data, index) => (
				<>
					<Link
						href={{
							pathname: '/options/program/program-detail',
							query: { slug: data.Id, name: data.Name }
						}}
					>
						<a>
							<IconButton icon="eye" color="orange" type="button" tooltip="Chi tiết Khung đào tạo" />
						</a>
					</Link>

					{checkIncludesRole(listPermissionsByRoles.config.trainingFramework.addTeacher, Number(userInformation?.RoleId)) && (
						<ProgramAddTeacherForm rowData={data} />
					)}

					{checkIncludesRole(listPermissionsByRoles.config.trainingFramework.update, Number(userInformation?.RoleId)) && (
						<ProgramForm rowData={data} specialize={specialize} setTodoApi={setTodoApi} listTodoApi={listTodoApi} />
					)}
					{checkIncludesRole(listPermissionsByRoles.config.trainingFramework.delete, Number(userInformation?.RoleId)) && (
						<DeleteTableRow text={`Khung đào tạo ${data.Name}`} handleDelete={() => handleDelete(data.Id)} />
					)}
				</>
			)
		}
	]

	useEffect(() => {
		if (
			!!userInformation &&
			!checkIncludesRole(listPermissionsByRoles.config.trainingFramework.viewList, Number(userInformation?.RoleId))
		) {
			Router.push('/')
		}
	}, [userInformation])

	return (
		<Fragment>
			<Head>
				<title>{appConfigs.appName} | Cấu hình Khung đào tạo</title>
			</Head>
			<PrimaryTable
				current={currentPage}
				total={totalPage && totalPage}
				loading={isLoading}
				onChangePage={(event: number) => setTodoApi({ ...listTodoApi, pageIndex: event })}
				Extra={
					checkIncludesRole(listPermissionsByRoles.config.trainingFramework.create, Number(userInformation?.RoleId)) ? (
						<ProgramForm specialize={specialize} setTodoApi={setTodoApi} listTodoApi={listTodoApi} />
					) : undefined
				}
				data={dataSource}
				columns={columns}
				TitleCard={
					<div className="extra-table">
						<FilterBase dataFilter={dataFilter} handleFilter={handleFilter} handleReset={handleReset} />
						<SortBox handleSort={(value) => handleSort(value)} dataOption={dataOption} />
					</div>
				}
			/>
		</Fragment>
	)
}

export default Programs
