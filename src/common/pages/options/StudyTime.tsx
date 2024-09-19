import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { studyTimeApi } from '~/api/study-time'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import PrimaryTable from '~/common/components/Primary/Table'
import StudyTimeForm from '~/common/components/StudyTime/StudyTimeForm'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import { setStudyTime } from '~/store/studyTimeReducer'

let pageIndex = 1

const StudyTime = () => {
	const state = useSelector((state: RootState) => state)
	const dispatch = useDispatch()
	const { information: userInformation } = useSelector((state: RootState) => state.user)
	const [isLoading, setIsLoading] = useState(false)
	const [totalPage, setTotalPage] = useState(null)

	const listTodoApi = {
		pageSize: PAGE_SIZE,
		pageIndex: pageIndex,
		sort: null,
		sortType: null
	}
	const [todoApi, setTodoApi] = useState(listTodoApi)

	// GET DATA COURSE
	const getDataSource = async () => {
		setIsLoading(true)
		try {
			let res = await studyTimeApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setStudyTime(res.data.data))
				setTotalPage(res.data.totalRow)
			}
			if (res.status === 204) {
				dispatch(setStudyTime([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (id) => {
		setIsLoading(true)
		try {
			const res = await studyTimeApi.delete(id)
			if (res.status === 200) {
				setTodoApi(listTodoApi)
				ShowNoti('success', res.data.message)
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}

	// USE EFFECT - FETCH DATA
	useEffect(() => {
		getDataSource()
	}, [todoApi])

	const columns = [
		{
			title: 'Ca học',
			dataIndex: 'Name',
			key: 'name',
			render: (value) => <span className="font-weight-primary">{value}</span>
		},
		{
			title: 'Thời gian (phút)',
			width: 150,
			dataIndex: 'Time',
			key: 'time',
			align: 'center',
			render: (value) => <span className="weight-600">{value}</span>
		},
		{
			width: 150,
			align: 'center',
			title: 'Bắt đầu',
			dataIndex: 'StartTime'
		},
		{
			width: 150,
			align: 'center',
			title: 'Kết thúc',
			dataIndex: 'EndTime'
		},
		{
			title: 'Chức năng',
			align: 'center',
			width: 120,
			render: (text, data, index) => (
				<>
					{checkIncludesRole(listPermissionsByRoles.config.timeShift.update, Number(userInformation?.RoleId)) && (
						<StudyTimeForm rowData={data} getDataSource={getDataSource} />
					)}
					{checkIncludesRole(listPermissionsByRoles.config.timeShift.delete, Number(userInformation?.RoleId)) && (
						<DeleteTableRow text={`ca học ${data.Name}`} handleDelete={() => handleDelete(data.Id)} />
					)}
				</>
			)
		}
	]

	useEffect(() => {
		if (!!userInformation && !checkIncludesRole(listPermissionsByRoles.config.timeShift.viewList, Number(userInformation?.RoleId))) {
			Router.push('/')
		}
	}, [userInformation])

	return (
		<>
			{checkIncludesRole(listPermissionsByRoles.config.timeShift.viewList, Number(userInformation?.RoleId)) && (
				<PrimaryTable
					total={totalPage && totalPage}
					loading={isLoading}
					onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
					Extra={
						checkIncludesRole(listPermissionsByRoles.config.timeShift.create, Number(userInformation?.RoleId)) ? (
							<StudyTimeForm getDataSource={getDataSource} />
						) : undefined
					}
					data={state.studyTime.StudyTime}
					columns={columns}
				/>
			)}
		</>
	)
}

export default StudyTime
