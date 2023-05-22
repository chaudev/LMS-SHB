import { Card, Empty, Spin, Timeline } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FcClock } from 'react-icons/fc'
import { ImMoveDown, ImMoveUp } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { studyRouteApi } from '~/api/study-route'
import PrimaryTag from '~/common/components/Primary/Tag'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import { ModalStudyRoute } from '../ModalStudyRoute'
import ModalViewStudyRouteTemplate from '../ModalViewStudyRouteTemplate'

type ITabStudyRoute = {
	StudentDetail: IUserResponse
}

export const TabStudyRoute: React.FC<ITabStudyRoute> = ({ StudentDetail }) => {
	const user = useSelector((state: RootState) => state.user.information)
	const [loading, setLoading] = useState(false)
	const initParameters = { studentIds: StudentDetail?.UserInformationId }
	const [apiParameters, setApiParameters] = useState(initParameters)
	const [dataTable, setDataTable] = useState([])

	const handleChangePosition = async (data) => {
		try {
			setLoading(true)
			const res = await studyRouteApi.updateIndex(data)
			if (res.status === 200) {
				getStudentStudyRoute(apiParameters)
				setLoading(false)
				ShowNoti('success', res.data.message)
			}
		} catch (error) {
			setLoading(true)
			ShowNoti('error', error.message)
		} finally {
			setLoading(false)
		}
	}

	const handleMoveItem = async (index: number, item: any, type: string) => {
		const temp = [...dataTable]
		const move = dataTable[index]

		if (type == 'up') {
			temp[index] = dataTable[index - 1]
			temp[index - 1] = move
			const data = {
				IdUp: temp[index - 1]?.Id,
				IdDown: temp[index]?.Id
			}
			handleChangePosition(data)
		} else {
			temp[index] = dataTable[index + 1]
			temp[index + 1] = move
			const data = {
				IdUp: temp[index]?.Id,
				IdDown: temp[index + 1]?.Id
			}
			handleChangePosition(data)
		}
		await setDataTable(temp)
	}

	const getStudentStudyRoute = async (params) => {
		try {
			setLoading(true)
			const res = await studyRouteApi.getStudentStudyRoute(params)
			if (res.status === 200) {
				const temp = res.data?.data?.map((item) => {
					return { ...item, ProgramModel: JSON.parse(item?.ProgramModel) }
				})
				setDataTable(temp)
				setLoading(false)
			}
			if (res.status === 204) {
				setLoading(true)
				setDataTable([])
			}
		} catch (error) {
			setLoading(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (StudentDetail) {
			getStudentStudyRoute(apiParameters)
		}
	}, [StudentDetail])

	return (
		<>
			<Card
				title=""
				extra={
					<div className="d-flex gap-3">
						{user?.RoleId == 3 || user?.RoleId == 8 ? (
							''
						) : (
							<ModalStudyRoute mode="add" onRefresh={() => getStudentStudyRoute(apiParameters)} />
						)}

						<ModalViewStudyRouteTemplate
							status={dataTable.length > 0 ? true : false}
							onRefresh={() => getStudentStudyRoute(apiParameters)}
						/>
					</div>
				}
			>
				{!loading && dataTable?.length == 0 && <Empty />}

				<Spin spinning={loading}>
					<Timeline mode="left">
						{dataTable &&
							dataTable?.length > 0 &&
							dataTable?.map((item, index) => (
								<Timeline.Item
									label={<div className="text-green font-[500]">{`[${item?.ProgramModel?.Code}] ${item?.ProgramModel?.Name}`}</div>}
									key={index}
									dot={<FcClock />}
								>
									<div className="flex justify-between ">
										<div>
											<PrimaryTag color={item?.Status == 1 ? 'yellow' : item?.Status == 2 ? 'blue' : 'green'} children={item?.StatusName} />
											<p>
												<span className="font-[500] ">Người tạo:</span> {item?.CreatedBy}
											</p>
											<p>
												<span className="font-[500]">Ngày tạo:</span> {moment(item?.CreatedOn).format('DD-MM-YYYY HH:mm A')}
											</p>
											<p>
												<span className="font-[500]">Ghi chú:</span> {item?.Note}
											</p>
										</div>
										{user?.RoleId == 3 || user?.RoleId == 8 ? (
											''
										) : (
											<div className="flex items-center gap-1">
												{index !== 0 && (
													<div className="icon   cursor-pointer" onClick={() => handleMoveItem(index, item, 'up')}>
														<ImMoveUp size={22} color="#0068ac" />
													</div>
												)}
												{index + 1 < dataTable.length && (
													<div className="icon  cursor-pointer" onClick={() => handleMoveItem(index, item, 'down')}>
														<ImMoveDown size={22} color="#007134" />
													</div>
												)}
												<ModalStudyRoute mode="edit" onRefresh={() => getStudentStudyRoute(apiParameters)} dataRow={item} />
												<ModalStudyRoute mode="delete" onRefresh={() => getStudentStudyRoute(apiParameters)} dataRow={item} />
											</div>
										)}
									</div>
								</Timeline.Item>
							))}
					</Timeline>
				</Spin>
			</Card>
		</>
	)
}
