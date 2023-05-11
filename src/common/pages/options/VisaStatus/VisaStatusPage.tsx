import { Card, Pagination, Popover, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { visaStatusApi } from '~/api/visa-status'
import EmptyData from '~/common/components/EmptyData'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalVisaStatusCRUD } from './ModalVisaStatusCRUD'
import { BiDotsVerticalRounded } from 'react-icons/bi'

export const VisaStatusPage = () => {
	const init = { pageIndex: 1, pageSize: PAGE_SIZE }
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(init)
	const [current, setCurrent] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [open, setOpen] = useState(null)

	const getData = async (params) => {
		try {
			setLoading(true)
			const res = await visaStatusApi.getAll(params)
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

	const getPagination = (pageNumber: number) => {
		setCurrent(pageNumber)
		setTodoApi({
			...todoApi,
			pageIndex: pageNumber
		})
	}

	const showTotal = () => totalItems && <div className="font-weight-black">Tổng cộng: {totalItems}</div>

	return (
		<>
			<Card
				title="Tình trạng Visa"
				extra={
					<>
						<ModalVisaStatusCRUD mode="add" onRefresh={() => getData(todoApi)} />
					</>
				}
			>
				{loading ? (
					<Skeleton />
				) : (
					<>
						{data?.length > 0 ? (
							<div className="ForeignLanguagePage">
								<div className="config-ForeignLanguage">
									{data?.map((item) => (
										<div className="item">
											<p>{item?.Name}</p>
											<div className="action">
												<Popover
													content={
														<>
															<div className="mb-2">
																<ModalVisaStatusCRUD setOpen={setOpen} dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
															</div>
															<div>
																<ModalVisaStatusCRUD setOpen={setOpen} dataRow={item} mode="delete" onRefresh={() => getData(todoApi)} />
															</div>
														</>
													}
													trigger="click"
													placement="left"
													open={item === open}
													onOpenChange={() => {
														if (open === item) {
															setOpen(null)
														} else {
															setOpen(item)
														}
													}}
												>
													<BiDotsVerticalRounded size={18} />
												</Popover>
											</div>
										</div>
									))}
								</div>
								<div className="custom-pagination">
									<Pagination
										size="small"
										current={current}
										onChange={(pageNumber) => getPagination(pageNumber)}
										total={totalItems}
										pageSize={PAGE_SIZE}
										showTotal={showTotal}
									/>
								</div>
							</div>
						) : (
							<EmptyData loading={loading} />
						)}
					</>
				)}
			</Card>
		</>
	)
}
