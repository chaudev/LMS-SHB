import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { officeApi } from '~/api/office'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalOfficeCRUD } from './ModalOfficeCRUD'

export const OfficePage = () => {
	const init = { pageIndex: 1, pageSize: PAGE_SIZE, search: '' }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [totalItems, setTotalItems] = useState(0)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await officeApi.getAll(params)
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
			title: 'Mã',
			width: 100,
			dataIndex: 'Code',
			render: (name) => <span className="font-medium">{name}</span>
		},
		{
			title: 'Văn phòng',
			width: 150,
			dataIndex: 'Name',
			render: (name) => <span className="font-weight-primary">{name}</span>
		},
		{
			title: 'Địa chỉ',
			width: 150,
			dataIndex: 'Address',
			render: (text) => <p>{text}</p>
		},
		{
			title: 'Điện thoại',
			width: 150,
			dataIndex: 'Mobile',
			render: (text) => <p>{text}</p>
		},
		{
			title: 'Email',
			width: 150,
			dataIndex: 'Email',
			render: (text) => <p>{text}</p>
		},
		{
			title: 'Chức năng',
			width: 50,
			dataIndex: 'Action',
			render: (text, item) => (
				<div className="flex items-center">
					<ModalOfficeCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
					<ModalOfficeCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
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
				TitleCard={<h1 className="text-2xl font-medium">Danh sách văn phòng đại diện</h1>}
				data={data}
				columns={columns}
				Extra={<ModalOfficeCRUD mode="add" onRefresh={() => getData(todoApi)} />}
			/>
		</>
	)
}
