import React, { useEffect, useState } from 'react'
import PrimaryTable from '~/common/components/Primary/Table'
import SpecializeForm from '~/common/components/Specialize/SpecializeForm'
import FilterColumn from '~/common/components/FilterTable/Filter/FilterColumn'
import { gradeApi } from '~/api/grade'
import moment from 'moment'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import { useDispatch } from 'react-redux'
import { setSpecialize } from '~/store/specializeReducer'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

let pageIndex = 1

const Specialize = () => {
	const { information: userInformation } = useSelector((state: RootState) => state.user)
	const state = useSelector((state: RootState) => state)
	const dispatch = useDispatch()
	const listTodoApi = {
		pageSize: PAGE_SIZE,
		pageIndex: pageIndex,
		Code: null,
		Name: null
	}
	const [isLoading, setIsLoading] = useState(false)
	const [totalPage, setTotalPage] = useState(null)
	const [todoApi, setTodoApi] = useState(listTodoApi)

	const handleDelete = async (id) => {
		try {
			const res = await gradeApi.delete(id)
			if (res.status === 200) {
				setTodoApi(listTodoApi)
				ShowNoti('success', res.data.message)
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	// GET DATA SOURCE
	const getDataSource = async () => {
		setIsLoading(true)
		try {
			let res = await gradeApi.getAll(todoApi)
			if (res.status === 200) {
				setTotalPage(res.data.totalRow)
				dispatch(setSpecialize(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setSpecialize([]))
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const onSearch = (valueSearch, dataIndex) => {
		setTodoApi({ ...todoApi, [dataIndex]: valueSearch })
	}

	const handleReset = () => {
		setTodoApi({ ...listTodoApi })
	}

	// USE EFFECT - FETCH DATA
	useEffect(() => {
		if (checkIncludesRole(listPermissionsByRoles.config.languageLevel.viewList, Number(userInformation?.RoleId))) {
			getDataSource()
		}
	}, [todoApi, userInformation])

	// Columns
	const columns = [
		{
			title: 'Mã',
			width: 100,
			dataIndex: 'Code',
			...FilterColumn('Code', onSearch, handleReset, 'text'),
			render: (value) => <span className="weight-600">{value}</span>
		},
		{
			title: 'Tên Trình độ tiếng',
			dataIndex: 'Name',
			width: 250,
			...FilterColumn('Name', onSearch, handleReset, 'text'),
			render: (value) => <span className="font-weight-primary">{value}</span>
		},
		{
			title: 'Tạo ngày',
			dataIndex: 'ModifiedOn',
			render: (date: any) => moment(date).format('DD/MM/YYYY HH:mm')
		},
		{
			width: 250,
			title: 'Người tạo',
			dataIndex: 'CreatedBy'
			// className: 'font-[600]'
		},
		{
			title: 'Chức năng',
			render: (text, data, index) => (
				<>
					{checkIncludesRole(listPermissionsByRoles.config.languageLevel.update, Number(userInformation?.RoleId)) && (
						<SpecializeForm rowData={data} setTodoApi={setTodoApi} listTodoApi={listTodoApi} />
					)}
					{checkIncludesRole(listPermissionsByRoles.config.languageLevel.delete, Number(userInformation?.RoleId)) && (
						<DeleteTableRow text={`Trình độ tiếng ${data.Name}`} handleDelete={() => handleDelete(data.Id)} />
					)}
				</>
			)
		}
	]

	return (
		<>
			{checkIncludesRole(listPermissionsByRoles.config.languageLevel.viewList, Number(userInformation?.RoleId)) && (
				<PrimaryTable
					total={totalPage && totalPage}
					loading={isLoading}
					onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
					Extra={
						checkIncludesRole(listPermissionsByRoles.config.languageLevel.create, Number(userInformation?.RoleId)) ? (
							<SpecializeForm setTodoApi={setTodoApi} listTodoApi={listTodoApi} />
						) : undefined
					}
					data={state.specialize.Specialize}
					columns={columns}
				/>
			)}
		</>
	)
}
export default Specialize
