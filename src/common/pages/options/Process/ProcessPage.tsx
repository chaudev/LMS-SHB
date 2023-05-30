import { Card, Pagination, Popover, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { processApi } from '~/api/process'
import EmptyData from '~/common/components/EmptyData'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalProcessCRUD } from './ModalProcessCRUD'
import PrimaryTable from '~/common/components/Primary/Table'

export const ProcessPage = () => {
	const init = { pageIndex: 1, pageSize: PAGE_SIZE }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [totalItems, setTotalItems] = useState(0)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await processApi.getAll(params)
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
					<ModalProcessCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
					<ModalProcessCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
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
				TitleCard={<h1 className="text-2xl font-medium">Tình trạng tiếng</h1>}
				data={data}
				columns={columns}
				Extra={<ModalProcessCRUD mode="add" onRefresh={() => getData(todoApi)} />}
			/>
		</>
	)
}
