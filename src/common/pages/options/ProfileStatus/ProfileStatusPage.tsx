import { Card, Pagination, Popover, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { profileStatusApi } from '~/api/profile-status'
import EmptyData from '~/common/components/EmptyData'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalProfileStatusCRUD } from './ModalProfileStatusCRUD'
import PrimaryTable from '~/common/components/Primary/Table'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'

export const ProfileStatusPage = () => {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const init = { pageIndex: 1, pageSize: PAGE_SIZE }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [totalItems, setTotalItems] = useState(0)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await profileStatusApi.getAll(params)
			if (res.status === 200) {
				setData(res.data.data)
				setTotalItems(res.data.totalRow)
			}
		} catch (error) {
			setLoading(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (todoApi) {
			getData(todoApi)
		}
	}, [todoApi])

	const columns = [
		{
			title: 'Tình trạng',
			width: 180,
			dataIndex: 'Name',
			render: (text) => <p className="font-weight-primary">{text}</p>
		},
		{
			title: 'Thao tác',
			dataIndex: 'Action',
			width: 50,
			render: (text, item) => (
				<div className="flex items-center">
					{checkIncludesRole(listPermissionsByRoles.config.applicationStatus.update, Number(userInformation?.RoleId)) && (
						<ModalProfileStatusCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
					)}
					{checkIncludesRole(listPermissionsByRoles.config.applicationStatus.delete, Number(userInformation?.RoleId)) && (
						<ModalProfileStatusCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
					)}
				</div>
			)
		}
	]

	return (
		<>
			<PrimaryTable
				loading={loading}
				total={totalItems}
				onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
				TitleCard={<h1 className="text-2xl font-medium">Tình trạng thu hồ sơ</h1>}
				data={data}
				columns={columns}
				Extra={
					checkIncludesRole(listPermissionsByRoles.config.applicationStatus.create, Number(userInformation?.RoleId)) ? (
						<ModalProfileStatusCRUD mode="add" onRefresh={() => getData(todoApi)} />
					) : undefined
				}
			/>
		</>
	)
}
