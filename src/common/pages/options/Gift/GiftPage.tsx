import React, { useEffect, useState } from 'react'
import { ModalGiftCRUD } from './ModalGiftCRUD'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { giftApi } from '~/api/gift'
import PrimaryTable from '~/common/components/Primary/Table'
import { _check } from '~/common/utils'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

export const GiftPage = () => {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const init = { pageIndex: 1, pageSize: PAGE_SIZE }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [totalItems, setTotalItems] = useState(0)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await giftApi.getAll(params)
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
			title: 'Hình ảnh',
			dataIndex: 'Thumbnail',
			width: 100,
			render: (text, item) => (
				<img className="table-row-thumbnail" src={text && _check.checkURL(text) ? text : '/images/default-product.svg'} />
			)
		},
		{
			title: 'Quà tặng',
			width: 180,
			dataIndex: 'Name',
			render: (text) => <p className="font-weight-primary">{text}</p>
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
			render: (text, item) => (
				<div className="flex items-center">
					{checkIncludesRole(listPermissionsByRoles.config.gift.update, Number(userInformation?.RoleId)) && (
						<ModalGiftCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
					)}
					{checkIncludesRole(listPermissionsByRoles.config.gift.delete, Number(userInformation?.RoleId)) && (
						<ModalGiftCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
					)}
				</div>
			)
		}
	]
	return (
		<PrimaryTable
			loading={loading}
			total={totalItems}
			onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
			TitleCard={<h1 className="text-2xl font-medium">Danh sách quà tặng</h1>}
			data={data}
			columns={columns}
			Extra={
				checkIncludesRole(listPermissionsByRoles.config.gift.create, Number(userInformation?.RoleId)) ? (
					<ModalGiftCRUD mode="add" onRefresh={() => getData(todoApi)} />
				) : undefined
			}
		/>
	)
}
