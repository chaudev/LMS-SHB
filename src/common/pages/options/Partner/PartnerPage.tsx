import React, { useEffect, useState } from 'react'
import { partnerApi } from '~/api/partner'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalPartnerCRUD } from './ModalPartnerCRUD'
import PrimaryTable from '~/common/components/Primary/Table'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

export const PartnerPage = () => {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const init = { pageIndex: 1, pageSize: PAGE_SIZE }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [totalItems, setTotalItems] = useState(0)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await partnerApi.getAll(params)
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
			title: 'Tên',
			width: 180,
			dataIndex: 'Name',
			className: 'font-weight-primary'

			// render: (text) => <p className="font-weight-primary">{text}</p>
		},
		{
			title: 'Điện thoại',
			width: 180,
			dataIndex: 'Mobile',
			render: (text) => <p className="">{text}</p>
		},
		{
			title: 'Email',
			width: 180,
			dataIndex: 'Email',
			render: (text) => <p className="">{text}</p>
		},
		{
			title: 'Người đại diện',
			width: 180,
			dataIndex: 'Representative',
			render: (text) => <p className="">{text}</p>
		},
		{
			title: 'Mô tả',
			width: 200,
			dataIndex: 'Description',
			render: (text) => <p className="">{text}</p>
		},
		{
			title: 'Thao tác',
			dataIndex: 'Action',
			width: 50,
			fexed: 'right',
			render: (text, item) => (
				<div className="flex items-center">
					{checkIncludesRole(listPermissionsByRoles.config.partner.update, Number(userInformation?.RoleId)) && (
						<ModalPartnerCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
					)}
					{checkIncludesRole(listPermissionsByRoles.config.partner.delete, Number(userInformation?.RoleId)) && (
						<ModalPartnerCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
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
				TitleCard={<h1 className="text-2xl font-medium">Danh sách đối tác</h1>}
				data={data}
				columns={columns}
				Extra={
					checkIncludesRole(listPermissionsByRoles.config.partner.create, Number(userInformation?.RoleId)) ? (
						<ModalPartnerCRUD mode="add" onRefresh={() => getData(todoApi)} />
					) : undefined
				}
			/>
		</>
	)
}
