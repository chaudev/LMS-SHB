import moment from 'moment'
import { useMemo, useState } from 'react'
import styles from './styles.module.scss'
import MyTable from '~/atomic/atoms/MyTable'
import IconButton from '~/common/components/Primary/IconButton'
import EditClassScheduleModal, { TClassSchedultData } from '../EditClassScheduleModal'
import { useMutation } from '@tanstack/react-query'
import { scheduleApi } from '~/api/schedule'
import { ShowNoti } from '~/common/utils'
import { Popconfirm, Tag } from 'antd'

type TProps = {
	data: TScheduleByRoomResponse
	isLoading?: boolean
	refetch?: () => void
}

const ClassScheduleTable = ({ data, isLoading = false, refetch }: TProps) => {
	const mutationDelete = useMutation({
		mutationFn: (Id: any) => scheduleApi.delete(Id),
		onSuccess(data, variables, context) {
			ShowNoti('success', 'Xóa thành công')
			refetch?.()
		},
		onError(error) {
			ShowNoti('error', error?.message)
		}
	})

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
								{roomData?.Schedules?.map((scheduleItem: TScheduleByRoomStudyTimeRoomSchedule, index: number) => {
									return (
										<div key={index} className="min-w-[180px] max-w-[280px] border rounded-md p-[12px] relative">
											<div className="flex justify-between gap-[12px]">
												<div className="font-medium mb-[4px]">{scheduleItem?.ClassName}</div>
												<div className="flex gap-[4px] mt-[-6px] mr-[-8px]">
													<EditScheduleButton
														branchId={scheduleItem?.BranchId}
														curriculumId={scheduleItem?.CurriculumId}
														scheduleId={scheduleItem?.ScheduleId}
														classScheduleData={{ ...scheduleItem, RoomId: item.RoomId }}
														refetch={refetch}
													/>
													<Popconfirm
														title="Bạn có chắc muốn xóa lịch này?"
														okText="Có"
														cancelText="Hủy"
														onConfirm={() => mutationDelete.mutate(scheduleItem.ScheduleId)}
														disabled={mutationDelete.isPending}
													>
														<IconButton type="button" icon="remove" color={'red'} className="m-0" tooltip="Xóa lịch" />
													</Popconfirm>
												</div>
											</div>
											<div className="text-[12px]">
												Buổi: <span className="font-medium">{`${scheduleItem?.ScheduleCurrent} / ${scheduleItem?.ScheduleTotal}`}</span>
											</div>
											<div className="text-[12px]">
												Số học viên: <span className="font-medium">{scheduleItem?.TotalStudent}</span>
											</div>
											<div className="flex justify-between gap-[12px]">
												<div className="text-[12px]">
													GV: <span className="font-medium">{scheduleItem?.TeacherName}</span>
												</div>
												<div className="mt-[-6px] mr-[-8px]">
													<StatusTag data={scheduleItem} />
												</div>
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

type TEditScheduleButtonProps = {
	classScheduleData?: TClassSchedultData
	scheduleId: number
	branchId: number
	curriculumId: number
	refetch?: () => void
}
const EditScheduleButton = ({ classScheduleData, scheduleId, branchId, curriculumId, refetch }: TEditScheduleButtonProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<IconButton className="m-0" type="button" color="blue" icon="edit" onClick={() => setIsOpen(true)} />

			<EditClassScheduleModal
				open={isOpen}
				onCancel={() => setIsOpen(false)}
				classScheduleData={classScheduleData}
				scheduleId={scheduleId}
				branchId={branchId}
				curriculumId={curriculumId}
				refetch={refetch}
			/>
		</>
	)
}

type TStatusTagProps = {
	data: TScheduleByRoomStudyTimeRoomSchedule
}

const StatusTag = ({ data }: TStatusTagProps) => {
	if (data?.IsAttendance) {
		return (
			<Tag color="blue" className="rounded">
				Đã học
			</Tag>
		)
	}
	if (moment().isAfter(moment(data?.StartTime))) {
		return (
			<Tag color="red" className="rounded">
				Không học
			</Tag>
		)
	}
	return (
		<Tag color="green" className="rounded">
			Chưa học
		</Tag>
	)
}
