import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { areaApi } from '~/api/area'
import { branchApi } from '~/api/branch'
import CenterForm from '~/common/components/Center/CenterForm'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import FilterColumn from '~/common/components/FilterTable/Filter/FilterColumn'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { checkIncludesRole, parseSelectArray } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import { setBranch } from '~/store/branchReducer'

const Center = () => {
	const { information: userInformation } = useSelector((state: RootState) => state.user)
	const state = useSelector((state: RootState) => state)
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [totalPage, setTotalPage] = useState(null)
	const [dataArea, setDataArea] = useState([])
	const listTodoApi = {
		pageSize: PAGE_SIZE,
		pageIndex: 1,
		Code: null,
		Name: null
	}
	const [todoApi, setTodoApi] = useState(listTodoApi)
	// GET DATA CENTER
	const getDataCenter = async () => {
		setIsLoading(true)
		try {
			let res = await branchApi.getAll(todoApi)
			if (res.status === 200) {
				setTotalPage(res.data.totalRow)
				dispatch(setBranch(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setBranch([]))
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	//GET DATA AREA
	const getAllArea = async () => {
		setIsLoading(true)
		try {
			const res = await areaApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				const convertData = parseSelectArray(res.data.data, 'Name', 'Id')
				setDataArea(convertData)
			}
			if (res.status === 204) {
				setDataArea([])
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDeleteBranch = async (branchID) => {
		let res = null
		try {
			res = await branchApi.delete(branchID)
			if (res.status === 200) {
				setTodoApi(listTodoApi)
				ShowNoti('success', res.data.message)
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	// ON SEARCH
	const onSearch = (valueSearch, dataIndex) => {
		setTodoApi({ ...todoApi, [dataIndex]: valueSearch })
	}

	const handleReset = () => {
		setTodoApi({ ...listTodoApi })
	}

	// USE EFFECT - FETCH DATA
	useEffect(() => {
		if (checkIncludesRole(listPermissionsByRoles.config.branch.viewList, Number(userInformation?.RoleId))) {
			getDataCenter()
		}
	}, [todoApi, userInformation])

	useEffect(() => {
		getAllArea()
	}, [])

	const columns = [
		{
			title: 'Tên trung tâm',
			dataIndex: 'Name',
			width: 200,
			fixed: 'left',
			...FilterColumn('Name', onSearch, handleReset, 'text'),
			render: (value) => <span className="font-weight-primary">{value}</span>
		},
		{
			title: 'Mã trung tâm',
			width: 150,
			dataIndex: 'Code',
			...FilterColumn('Code', onSearch, handleReset, 'text')
		},

		{
			title: 'Địa chỉ',
			width: 150,
			dataIndex: 'Address'
		},
		{
			title: 'Số điện thoại',
			width: 150,
			dataIndex: 'Mobile'
		},
		{
			title: 'Email',
			width: 150,
			dataIndex: 'Email'
		},
		{
			title: 'Chức năng',
			width: 170,
			fixed: 'right',
			// responsive: ['md'],
			render: (text, data, index) => (
				<>
					<Link
						href={{
							pathname: '/options/center/rooms-detail',
							query: { slug: `${data.Id}` }
						}}
					>
						<IconButton type="button" icon="eye" color="orange" tooltip={'Xem phòng'} />
					</Link>

					{checkIncludesRole(listPermissionsByRoles.config.branch.update, Number(userInformation?.RoleId)) && (
						<CenterForm dataArea={dataArea} rowData={data} setTodoApi={setTodoApi} listTodoApi={listTodoApi} />
					)}

					{checkIncludesRole(listPermissionsByRoles.config.branch.delete, Number(userInformation?.RoleId)) && (
						<DeleteTableRow text={data.Name} handleDelete={() => handleDeleteBranch(data.Id)} />
					)}
				</>
			)
		}
	]

	return (
		<Fragment>
			<PrimaryTable
				loading={isLoading}
				total={totalPage && totalPage}
				Extra={
					checkIncludesRole(listPermissionsByRoles.config.branch.create, Number(userInformation?.RoleId)) ? (
						<CenterForm dataArea={dataArea} setTodoApi={setTodoApi} listTodoApi={listTodoApi} />
					) : undefined
				}
				data={state.branch.Branch}
				columns={columns}
				onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
				TitleCard={<div className="extra-table">{/* <SortBox handleSort={(value) => handleSort(value)} dataOption={dataOption} /> */}</div>}
			/>
		</Fragment>
	)
}
export default Center
