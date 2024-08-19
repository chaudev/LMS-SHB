import React, { useEffect, useState } from 'react'
import { majorsApi } from '~/api/majors/majors'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalMajorsCRUD } from './Component/ModalMajorsCRUD'
import { _check } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'
import IconButton from '~/common/components/Primary/IconButton'
import { useRouter } from 'next/router'
import { nanoid } from '@reduxjs/toolkit'
import { Input, Tag, Tooltip } from 'antd'

export const MajorsPage = () => {
	const router = useRouter()
	const init = { pageIndex: 1, pageSize: PAGE_SIZE, search: null }
	const [data, setData] = useState<IMajors[]>([])
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
			if (res.status === 204) {
				setData([])
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
			className: 'font-weight-primary'

			// render: (text) => <p className="font-[700]">{text}</p>
		},
		{
			title: 'Nhóm ngành',
			width: 180,
			dataIndex: 'MajorGroupName'
		},
		{
			title: 'Giá',
			width: 180,
			dataIndex: 'Price',
			align: 'right',
			render: (text) => <p className="">{parseToMoney(text)}</p>
		},
		{
			title: 'Trạng thái',
			width: 180,
			dataIndex: 'StatusName',
			render: (text, item) => <span className={`tag ${item.Status == 1 ? 'blue' : 'yellow'}`}>{text}</span>
		},
		{
			title: 'Mô tả',
			width: 200,
			dataIndex: 'Description',
			render: (text, item) => (
				<Tooltip title={text}>
					<p className="max-w-[150px] in-3-line">{text}</p>
				</Tooltip>
			)
		},
		{
			title: 'Thao tác',
			dataIndex: 'Action',
			fixed: 'right',
			width: 50,
			render: (text, item) => (
				<div className="flex items-center">
					<ModalMajorsCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
					<ModalMajorsCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />

					<IconButton
						type="button"
						icon={'eye'}
						color="orange"
						onClick={() => {
							router.push({
								pathname: '/majors/students',
								query: {
									slug: item.Id,
									key: nanoid(),
									name: item.Name
								}
							})
						}}
						tooltip="Xem danh sách học viên trong ngành học"
					/>

					<IconButton
						type="button"
						icon={'salary'}
						color="blue"
						onClick={() => {
							router.push({
								pathname: '/majors/payment-type',
								query: {
									slug: item.Id,
									key: nanoid(),
									name: item.Name
								}
							})
						}}
						tooltip="Hình thức thanh toán"
					/>
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
					<Input.Search
						className="primary-search max-w-[250px] ml-[8px]"
						onChange={(event) => {
							if (event.target.value == '') {
								setTodoApi({ ...todoApi, pageIndex: 1, search: '' })
							}
						}}
						onSearch={(event) => setTodoApi({ ...todoApi, pageIndex: 1, search: event })}
						placeholder="Tìm kiếm"
					/>
				}
				data={data}
				columns={columns}
				Extra={<ModalMajorsCRUD mode="add" onRefresh={() => getData(todoApi)} />}
			/>
		</>
	)
}
