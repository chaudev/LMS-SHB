import React, { useEffect, useState } from 'react'
import { paymentTypeApi } from '~/api/payment-type'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalPaymentTypeCRUD } from './ModalPaymentTypeCRUD'
import { _check } from '~/common/utils'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { PaymentTypeRenderRow } from './PaymentTypeRenderRow'

let pageIndex = 1
export const PaymentTypePage = () => {
	const init = { pageIndex: 1, pageSize: PAGE_SIZE }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [totalItems, setTotalItems] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await paymentTypeApi.getAll(params)
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
			title: 'Hình thức',
			width: 100,
			dataIndex: 'Name',
			render: (text) => <p className="font-[700]">{text}</p>
		},
		{
			title: 'Số lần',
			width: 100,
			dataIndex: 'Times',
			render: (text) => <p className="">{text}</p>
		},
		{
			title: 'Thao tác',
			dataIndex: 'Action',
			width: 50,
			render: (text, item) => (
				<div className="flex items-center">
					<ModalPaymentTypeCRUD dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
					<ModalPaymentTypeCRUD dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
					<ModalPaymentTypeCRUD dataRow={item} mode="edit-detail" onRefresh={() => getData(todoApi)} />
				</div>
			)
		}
	]

	const getPagination = (pageNumber: number) => {
		pageIndex = pageNumber
		setCurrentPage(pageNumber)
		setTodoApi({
			...todoApi,
			pageIndex: pageIndex
		})
	}

	const expandedRowRender = (data) => {
		return <PaymentTypeRenderRow Id={data?.Id} />
	}
	return (
		<>
			<ExpandTable
				currentPage={currentPage}
				loading={loading}
				total={totalItems}
				getPagination={(pageNumber: number) => getPagination(pageNumber)}
				onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
				TitleCard={<h1 className="text-2xl font-medium">Hình thức đóng tiền</h1>}
				dataSource={data}
				columns={columns}
				Extra={<ModalPaymentTypeCRUD mode="add" onRefresh={() => getData(todoApi)} />}
				// expandable={expandedRowRender}
			/>
		</>
	)
}
