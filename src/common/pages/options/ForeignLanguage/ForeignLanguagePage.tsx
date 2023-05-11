import React, { useEffect, useState } from 'react'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalForeignLanguageCRUD } from './ModalForeignLanguageCRUD'
import { Card, Pagination, Popover, Skeleton } from 'antd'
import { foreignLanguageApi } from '~/api/foreign-language'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import EmptyData from '~/common/components/EmptyData'

export const ForeignLanguagePage = () => {
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
			const res = await foreignLanguageApi.getAll(params)
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
				title="Tình trạng tiếng"
				extra={
					<>
						<ModalForeignLanguageCRUD mode="add" onRefresh={() => getData(todoApi)} />
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
																<ModalForeignLanguageCRUD setOpen={setOpen} dataRow={item} mode="edit" onRefresh={() => getData(todoApi)} />
															</div>
															<div>
																<ModalForeignLanguageCRUD
																	setOpen={setOpen}
																	dataRow={item}
																	mode="delete"
																	onRefresh={() => getData(todoApi)}
																/>
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
