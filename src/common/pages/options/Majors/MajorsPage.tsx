import React, { useEffect, useState } from 'react'
import { majorsApi } from '~/api/majors/majors'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalMajorsCRUD } from './ModalMajorsCRUD'
import { _check } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'

export const MajorsPage = () => {
	const init = { pageIndex: 1, pageSize: PAGE_SIZE }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [totalItems, setTotalItems] = useState(0)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await majorsApi.getAll(params)
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
			render: (text, item) => <img className="table-row-thumbnail" src={text && _check.checkURL(text) ? text : '/images/study01.png'} />
		},
		{
			title: 'Tên',
			width: 180,
			dataIndex: 'Name',
			render: (text) => <p className="font-[700]">{text}</p>
		},
		{
			title: 'Giá',
			width: 180,
			dataIndex: 'Price',
			render: (text) => <p className="">{parseToMoney(text)}</p>
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
					<ModalMajorsCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
					<ModalMajorsCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
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
				TitleCard={<h1 className="text-2xl font-medium">Danh sách ngành học</h1>}
				data={data}
				columns={columns}
				Extra={<ModalMajorsCRUD mode="add" onRefresh={() => getData(todoApi)} />}
			/>
		</>
	)
}
