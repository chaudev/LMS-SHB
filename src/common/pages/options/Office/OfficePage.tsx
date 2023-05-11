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
			title: 'Văn phòng',
			width: 150,
			dataIndex: 'Name',
			render: (name) => <span className="font-[700]">{name}</span>
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
				TitleCard={
					<div className="flex-1">
						<Input.Search
							className="primary-search max-w-[250px]"
							onChange={(event) => {
								if (event.target.value == '') {
									setTodoApi({ ...todoApi, pageIndex: 1, search: '' })
								}
							}}
							onSearch={(event) => setTodoApi({ ...todoApi, pageIndex: 1, search: event })}
							placeholder="Tìm kiếm"
						/>
					</div>
				}
				data={data}
				columns={columns}
				Extra={<ModalOfficeCRUD mode="add" onRefresh={() => getData(todoApi)} />}
			/>
		</>
	)
}
