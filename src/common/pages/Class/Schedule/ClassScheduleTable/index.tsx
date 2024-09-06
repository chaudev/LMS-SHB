import moment from 'moment'
import { useMemo } from 'react'
import styles from './styles.module.scss'
import MyTable from '~/atomic/atoms/MyTable'

type TProps = {
	data: TScheduleByRoomResponse
	isLoading?: boolean
}

const ClassScheduleTable = ({ data, isLoading = false }: TProps) => {
	const tableData = useMemo(() => {
		const _tableData = []
		if (data?.ScheduleByRoom) {
			data?.ScheduleByRoom?.forEach((item) => {
				const rawDataFirst = {
					DayOfWeek: item.DayOfWeek,
					IndexDayOfWeek: item.IndexDayOfWeek,
					DayOfWeekName: item.DayOfWeekName,
					Date: item.Date,
					RowSpan: item.StudyTimes?.length || 0
				}
				item.StudyTimes?.forEach((studyTimesItem, index) => {
					let rawDataSecond = {
						...rawDataFirst,
						StudyTimeId: studyTimesItem.StudyTimeId,
						StudyTimeName: studyTimesItem.StudyTimeName,
						RowSpan: index === 0 ? rawDataFirst.RowSpan : 0
					}

					studyTimesItem?.Rooms?.forEach((roomItem) => {
						rawDataSecond = {
							...rawDataSecond,
							[roomItem.RoomId]: roomItem
						}
					})

					_tableData.push(rawDataSecond)
				})
			})
		}
		return _tableData
	}, [data])

	const columns: any[] = useMemo(() => {
		const initColumns = [
			{
				title: 'Ngày',
				dataIndex: 'Date',
				align: 'center',
				width: 120,
				onCell: (record, index) => {
					return { rowSpan: record?.RowSpan }
				},
				render: (text, record) => {
					return (
						<div className="text-center">
							<p className="font-medium">{record?.DayOfWeekName}</p>
							<p className="font-medium">{moment(text).format('DD/MM/YYYY')}</p>
						</div>
					)
				}
			},
			{
				title: (
					<>
						<div className={styles.triangleLeft}>
							<p>Ca học</p>
						</div>
						<div className={styles.triangleRight}>
							<p>Phòng học</p>
						</div>
						<div className={styles.divider}></div>
					</>
				),
				className: styles.timeshiftHeaderWrapper,
				dataIndex: 'StudyTimeId',
				render: (text, record) => <p className="">{record?.StudyTimeName}</p>
			}
		]
		const roomColumns =
			data?.Rooms?.map((item) => {
				return {
					title: item.RoomName,
					dataIndex: item.RoomId,
					render: (text, record) => {
						const roomData = record[item.RoomId]
						if (!roomData) return ''
						return (
							<div className="flex flex-col gap-[8px]">
								{roomData?.Schedules?.map((item, index) => {
									return (
										<div key={index} className="min-w-[160px] max-w-[200px] border rounded-md p-[12px]">
											<div className="font-medium mb-[4px]">{item?.ClassName}</div>
											<div className="text-[12px]">
												Buổi: <span className="font-medium">{`${item?.ScheduleCurrent} / ${item?.ScheduleTotal}`}</span>
											</div>
											<div className="text-[12px]">
												Số học viên: <span className="font-medium">{item?.TotalStudent}</span>
											</div>
											<div className="text-[12px]">
												GV: <span className="font-medium">{item?.TeacherName}</span>
											</div>
										</div>
									)
								})}
							</div>
						)
					}
				}
			}) || []

		return [...initColumns, ...roomColumns]
	}, [data])

	return (
		<div className={styles.wrapper}>
			<MyTable columns={columns} dataSource={tableData} loading={isLoading} className={styles.tableWrapper} pagination={false} />
		</div>
	)
}

export default ClassScheduleTable
