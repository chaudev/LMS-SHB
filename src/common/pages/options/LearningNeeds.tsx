import React, { useEffect, useState } from 'react'
import LearningNeedsForm from '~/common/components/LearningNeeds/LearningNeedsForm'
import PrimaryTable from '~/common/components/Primary/Table'
import { learningNeedApi } from '~/api/learning-needs'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setLearningNeed } from '~/store/learningNeedReducer'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

const LearningNeeds = () => {
	const state = useSelector((state: RootState) => state)
	const userInformation = useSelector((state: RootState) => state.user.information)
	const dispatch = useDispatch()
	const [totalPage, setTotalPage] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [todoApi, setTodoApi] = useState({ pageIndex: 1, pageSize: PAGE_SIZE })

	const getDataSource = async () => {
		setIsLoading(true)
		try {
			let res = await learningNeedApi.getAll(todoApi)
			if (res.status == 200) {
				dispatch(setLearningNeed(res.data.data))
				setTotalPage(res.data.totalRow)
			}
			if (res.status == 204) {
				dispatch(setLearningNeed([]))
			}
		} catch (err) {
			ShowNoti('error', err?.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (id) => {
		try {
			const res = await learningNeedApi.delete(id)
			if (res.status === 200) {
				getDataSource()
				ShowNoti('success', res.data.message)
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const columns = [
		{
			title: 'Nhu cầu học',
			dataIndex: 'Name',
			render: (text) => {
				return <p className="font-weight-primary">{text}</p>
			}
		},
		{
			title: 'Người tạo',
			dataIndex: 'CreatedBy',
			render: (text) => {
				return <p>{text}</p>
			}
		},
		{
			title: 'Chức năng',
			dataIndex: 'Action',
			render: (text, record) => {
				return (
					<>
						{checkIncludesRole(listPermissionsByRoles.config.learningNeeds.update, Number(userInformation?.RoleId)) && (
							<LearningNeedsForm record={record} getDataSource={getDataSource} />
						)}
						{checkIncludesRole(listPermissionsByRoles.config.learningNeeds.delete, Number(userInformation?.RoleId))}
						<DeleteTableRow text={record.Name} handleDelete={() => handleDelete(record.Id)} />
					</>
				)
			}
		}
	]

	useEffect(() => {
		getDataSource()
	}, [todoApi])

	return (
		<PrimaryTable
			// addClass="basic-header modal-medium"
			loading={isLoading}
			// currentPage={currentPage}
			total={totalPage && totalPage}
			// getPagination={getPagination}
			data={state.learningNeed.LearningNeed}
			columns={columns}
			// TitlePage="Danh sách nhu cầu học"
			Extra={
				checkIncludesRole(listPermissionsByRoles.config.learningNeeds.create, Number(userInformation?.RoleId)) ? (
					<LearningNeedsForm getDataSource={getDataSource} />
				) : undefined
			}
			onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
		/>
	)
}
export default LearningNeeds
