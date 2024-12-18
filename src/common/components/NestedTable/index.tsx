import React, { useEffect, useState } from 'react'
import { Table, Card } from 'antd'
import EmptyData from '~/common/components/EmptyData'

const NestedTable = React.memo((props: any) => {
	const [dataSource, setDataSource] = useState([])
	const [activeIndex, setActiveIndex] = useState(null)

	useEffect(() => {
		let dataClone = [...props.dataSource]
		dataClone.forEach((item, index) => {
			item.key = index.toString()
		})
		setDataSource(dataClone)
	}, [props.dataSource])

	const selectRow = (record) => {
		const selectedRowKeys = []
		if (selectedRowKeys.indexOf(record.key) >= 0) {
			selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1)
		} else {
			selectedRowKeys.push(record.key)
		}
	}

	const changePagination = (pageNumber) => {
		if (typeof props.getPagination != 'undefined') {
			props.getPagination(pageNumber)
		} else {
			return pageNumber
		}
	}

	return (
		<>
			<div className="nested-table">
				<Card
					className={`cardRadius mb-3 ${props.addClass && props.addClass} ${
						props.Size ? props.Size : '' // table-small || table-medium
					}`}
					title={props.Extra}
					extra={props.TitleCard}
				>
					{props.children}
					{dataSource.length == 0 && <EmptyData loading={props.loading?.status} />}
					{dataSource.length > 0 && (
						<Table
							className={props.addClass && props.addClass}
							loading={(props.loading?.type == 'GET_ALL' && props.loading?.status) || !!props?.loading}
							bordered={props.haveBorder ? props.haveBorder : false}
							scroll={{ x: 'max-content' }}
							columns={props.columns}
							dataSource={dataSource}
							size="middle"
							pagination={{
								showTotal: () => <div className="font-weight-black">Tổng cộng: {props.totalPage}</div>,
								pageSize: props.pageSize || 30,
								pageSizeOptions: ['30'],
								total: props.totalPage && props.totalPage,
								onChange: (pageNumber) => changePagination(pageNumber),
								current: props.currentPage && props.currentPage
							}}
							rowClassName={(record, index) =>
								index == activeIndex ? 'table-row-active' : index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
							}
							onRow={(record, index) => ({
								onClick: () => {
									selectRow(record)
									setActiveIndex(index)
								}
							})}
						/>
					)}
				</Card>
			</div>
		</>
	)
})

export default NestedTable
