import { Avatar, Card, Collapse, Popover, Tooltip } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import PrimaryButton from '../Primary/Button'
import ZoomManager from '../Zoom/ZoomManager'
import { UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import PrimaryTag from '../Primary/Tag'

const ScheduleCalendar = (props) => {
	const { dataRow, onRefresh, setIsHidden } = props

	useEffect(() => {
		if (dataRow.view.type === 'timeGridWeek') {
			setIsHidden(true)
		} else {
			setIsHidden(false)
		}
	}, [dataRow.view.type])

	console.log('------ ScheduleCalendar: ', props?.dataRow?.event?._def?.extendedProps)

	const getStatusSchedule = () => {
		switch (dataRow.event.extendedProps.Status) {
			case 1:
				return '!rounded-md !bg-[#FFF]'
			case 2:
				return '!rounded-md !bg-[#FFF]'
		}
	}

	const getStatusSchedulePoppover = () => {
		switch (dataRow.event.extendedProps.Status) {
			case 1:
				return '!rounded-md !bg-[#FFF] !border-2 !border-solid !border-[#fb862d] '
			case 2:
				return '!rounded-md !bg-[#FFF] !border-2 !border-solid !border-[#43b413] '
		}
	}

	const getStatusScheduleTime = () => {
		switch (dataRow.event.extendedProps.Status) {
			case 1:
				return '!rounded px-1 py-[2px]  !text-[12px] !bg-[#fb862d] !text-[#FFF] '
			case 2:
				return '!rounded px-1 py-[2px]  !text-[12px] !bg-[#43b413] !text-[#FFF] '
		}
	}

	const getStatusScheduleTag = () => {
		switch (dataRow.event.extendedProps.Status) {
			case 1:
				return '!border-2 !border-solid !border-[#fb862d] !text-[#fb862d] !bg-[#FFF] !rounded-md'
			case 2:
				return '!border-2 !border-solid !border-[#43b413] !text-[#43b413] !bg-[#FFF] !rounded-md'
		}
	}

	function isActive() {
		return dataRow.event.extendedProps.Status == 1 ? true : false
	}

	return (
		<>
			{dataRow.view.type === 'dayGridDay' ? (
				<>
					<Card
						hoverable
						key={dataRow.event.extendedProps.Id}
						className="w-full "
						title={
							<div className="d-flex items-center gap-[8px]">
								<Avatar
									className="w-[26px] h-[26px]  bg-[#939292]"
									src={dataRow.event.extendedProps.TeacherAvatar || '/default-avatar.png'}
								/>
								<div className="text-[14px] font-[500] text-report">{dataRow.event.extendedProps.TeacherName}</div>
							</div>
						}
						extra={
							<div className="font-[500]">
								{/* {moment(dataRow.event.extendedProps.start).format('HH:mm')} - {moment(dataRow.event.extendedProps.end).format('HH:mm')} */}
								{moment(props?.dataRow?.event?._def?.extendedProps.StartTime).format('HH:mm')} -{' '}
								{moment(props?.dataRow?.event?._def?.extendedProps.EndTime).format('HH:mm')}
								{/* props?.dataRow?.event?._def?.extendedProps */}
							</div>
						}
					>
						<div className="text-[14px] font-[400] mb-[8px]">
							<span className="text-gray">Lớp:&nbsp;</span>
							<span>{dataRow.event.extendedProps.ClassName}</span>
						</div>
						<div className="mb-[4px]">
							<span className="text-gray">Giảng viên:&nbsp;</span>
							<span>{dataRow.event.extendedProps.TeacherName}</span>
						</div>
						<div className="mb-[4px]">
							<span className="text-gray">Ngày bắt đầu:&nbsp;</span>
							<span>{moment(dataRow.event.extendedProps.start).format('DD/MM/YYYY')}</span>
						</div>
						<div className="mb-[4px]">
							<span className="text-gray">Ngày kết thúc:&nbsp;</span>
							<span>{moment(dataRow.event.extendedProps.end).format('DD/MM/YYYY')}</span>
						</div>
						<div className="mb-[4px]">
							<span className="text-gray">Trạng thái:&nbsp;</span>
							<span>
								<PrimaryTag color={dataRow.event.extendedProps.Status === 1 ? 'orange' : 'green'}>
									{dataRow.event.extendedProps.StatusName}
								</PrimaryTag>{' '}
							</span>
						</div>
						{dataRow.event.extendedProps.Note && (
							<div className="mb-[4px]">
								<span>Ghi chú: &nbsp;</span>
								<span>{dataRow.event.extendedProps.Note}</span>
							</div>
						)}
					</Card>
				</>
			) : (
				<>
					<div className="wrapper-schedule wrapper-schedule-calender relative ">
						<div className={`${getStatusScheduleTag()}`}>
							<Popover
								trigger="click"
								content={
									<div className={`wrapper-content-schedule`}>
										<p>
											<span className="title">Lớp:</span>{' '}
											<Link href={`/class/list-class/detail/?class=${dataRow.event.extendedProps.ClassId}`}>
												<a className="font-medium hover:underline">{dataRow.event.extendedProps.ClassName}</a>
											</Link>
										</p>
										<p>
											<span className="title">GV:</span> {dataRow.event.extendedProps.TeacherName}
										</p>
										{!!dataRow.event.extendedProps?.RoomId && (
											<p>
												<span className="title">Phòng:</span> {dataRow.event.extendedProps.RoomName}
											</p>
										)}

										<p>
											<span className="title">Ghi chú:</span>
											<span className="whitespace-pre-line ml-1">{dataRow.event.extendedProps.Note}</span>
										</p>

										{/* <ZoomManager data={dataRow.event.extendedProps} onRefresh={onRefresh} /> */}
									</div>
								}
							>
								<button
									// onDoubleClick={() => router.push(`/class/list-class/detail/?class=${dataRow.event.extendedProps.ClassId}`)}
									// className={`${getStatusSchedule()}  !bg-white !text-[#fff] font-semibold  w-full p-[6px] flex justify-left items-center gap-2`}
									className={`${getStatusSchedule()}  !bg-white !text-[#fff] font-semibold w-full p-[6px] gap-2`}
								>
									{/* <span className={`${getStatusScheduleTime()}`}>{moment(dataRow.event.start).format('HH:mm')}</span>{' '}
									<span className={`${getStatusScheduleTime()}`}>{moment(dataRow.event.end).format('HH:mm')}</span> */}
									<div
										style={{
											flex: 1,
											display: 'flex',
											justifyContent: 'space-between'
										}}
									>
										<span className={`${getStatusScheduleTime()}`} style={{ marginRight: 20, flex: 50 }}>
											{moment(props?.dataRow?.event?._def?.extendedProps.StartTime).format('HH:mm')}
										</span>
										<span className={`${getStatusScheduleTime()}`} style={{ flex: 50 }}>
											{moment(props?.dataRow?.event?._def?.extendedProps.EndTime).format('HH:mm')}
										</span>
									</div>
									<div style={{ border: '0.5px solid #F0F2F4', margin: '3px 0' }} />
									<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start !important' }}>
										<p className="text-gv-in-calendar" style={{ color: '#212121', alignSelf: 'start' }}>
											<span className="title">GV:</span> {dataRow.event.extendedProps.TeacherName}
										</p>
										<p className="text-gv-in-calendar " style={{ color: '#212121', alignSelf: 'start' }}>
											<span className="title">Lớp: </span>
											<Link
												className="text-decoration-hover"
												href={`/class/list-class/detail/?class=${dataRow.event.extendedProps.ClassId}`}
											>
												{dataRow.event.extendedProps.ClassName}
											</Link>
										</p>
										{/* {!!dataRow.event.extendedProps?.RoomId ? (
											<p className="text-gv-in-calendar" style={{ color: '#212121', alignSelf: 'start' }}>
												<span className="title">Phòng:</span> {dataRow.event.extendedProps.RoomName}
											</p>
										) : (
											<p className="text-gv-in-calendar" style={{ color: '#212121', alignSelf: 'start' }}>
												<span className="title">Phòng:</span> Online
											</p>
										)} */}
									</div>
									{/* {moment(props?.dataRow?.event?._def?.extendedProps.StartTime).format('HH:mm')} -{' '}
								{moment(props?.dataRow?.event?._def?.extendedProps.EndTime).format('HH:mm')} */}
									{/* <Avatar
										className="w-[24px] h-[24px]  bg-[#939292]"
										src={dataRow.event.extendedProps?.TeacherAvatar || '/default-avatar.png'}
									/> */}
								</button>
							</Popover>
						</div>
					</div>

					<Popover
						content={
							<>
								<span className="title">Ca: </span>
								{/* <span>{moment(dataRow.event.start).format('HH:mm')}</span> <span className="mx-1">-</span> */}
								{/* <span>{moment(dataRow.event.end).format('HH:mm')}</span> */}
								<span>{moment(props?.dataRow?.event?._def?.extendedProps.StartTime).format('HH:mm')}</span> <span className="mx-1">-</span>
								<span>{moment(props?.dataRow?.event?._def?.extendedProps.EndTime).format('HH:mm')}</span>
								<div className="wrapper-content-schedule">
									<p>
										<span className="title">Lớp: </span> {dataRow.event.extendedProps.ClassName}
									</p>
									<p>
										<span className="title">Trạng thái:</span> {dataRow.event.extendedProps.StatusName}
									</p>
									<p>
										{/* <span className="title">Ngày bắt đầu:</span> {moment(dataRow.event.start).format('DD/MM/YYYY')} */}
										<span className="title">Ngày bắt đầu:</span>{' '}
										{moment(props?.dataRow?.event?.extendedProps.StartTime).format('DD/MM/YYYY')}
									</p>
									<p>
										{/* <span className="title">Ngày kết thúc:</span> {moment(dataRow.event.end).format('DD/MM/YYYY')} */}
										<span className="title">Ngày kết thúc:</span>{' '}
										{moment(props?.dataRow?.event?._def?.extendedProps.EndTime).format('DD/MM/YYYY')}
									</p>
									<p>
										<span className="title">GV:</span> {dataRow.event.extendedProps.TeacherName}
									</p>
									{!!dataRow.event.extendedProps.RoomId && (
										<p>
											<span className="title">Phòng:</span> {dataRow.event.extendedProps.RoomName}
										</p>
									)}
									<p>
										<span className="title">Ghi chú:</span>
										<span className="whitespace-pre-line ml-1">{dataRow.event.extendedProps.Note}</span>
									</p>
									{/* Mấy cái button tham gia lớp + tạo lớp bla bla nằm ở trong đây! chỉ cần mở cmt là dc */}
									{/* <ZoomManager isPopover data={dataRow.event.extendedProps} onRefresh={onRefresh} /> */}
								</div>
							</>
						}
						title="Thông tin buổi học"
						trigger="click"
					>
						<div className="wrapper-schedule wrapper-schedule-tablet">
							<button
								className={`${getStatusSchedulePoppover()} !bg-white !text-[#FFF] font-semibold  w-full p-[6px] flex justify-start gap-2`}
								style={{
									display: 'flex',
									flexDirection: 'column',
									height: 'auto'
								}}
							>
								{/* <span className={`${getStatusScheduleTime()}`}>{moment(dataRow.event.start).format('HH:mm')}</span>{' '}
								<span className={`${getStatusScheduleTime()}`}>{moment(dataRow.event.end).format('HH:mm')}</span> */}
								<div
									style={{
										flex: 1,
										display: 'flex',
										justifyContent: 'space-between',
										width: '100%'
									}}
								>
									<span className={`${getStatusScheduleTime()}`} style={{ marginRight: 20, flex: 50 }}>
										{moment(props?.dataRow?.event?._def?.extendedProps.StartTime).format('HH:mm')}
									</span>
									<span className={`${getStatusScheduleTime()}`} style={{ flex: 50 }}>
										{moment(props?.dataRow?.event?._def?.extendedProps.EndTime).format('HH:mm')}
									</span>
								</div>
								<div style={{ border: '0.5px solid #F0F2F4', margin: '2px 0', width: '100%' }} />
								<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start !important', width: '100%' }}>
									<p
										style={{
											color: '#212121',
											alignSelf: 'start',
											whiteSpace: 'pre-wrap',
											textAlign: 'start',
											fontSize: 11.9,
											fontWeight: '500'
										}}
									>
										<span className="title">GV:</span> {dataRow.event.extendedProps.TeacherName}
									</p>
									<p
										className="text-gv-in-calendar"
										style={{
											color: '#212121',
											alignSelf: 'start',
											whiteSpace: 'pre-wrap',
											textAlign: 'start',
											fontSize: 11.9,
											fontWeight: '500'
										}}
									>
										<span className="title">Lớp: </span>
										<Link className="text-decoration-hover" href={`/class/list-class/detail/?class=${dataRow.event.extendedProps.ClassId}`}>
											{dataRow.event.extendedProps.ClassName}
										</Link>
									</p>
									{/* {!!dataRow.event.extendedProps?.RoomId ? (
										<p
											className="text-gv-in-calendar"
											style={{
												color: '#212121',
												alignSelf: 'start',
												whiteSpace: 'pre-wrap',
												textAlign: 'start',
												fontSize: 11.9,
												fontWeight: '500'
											}}
										>
											<span className="title">Phòngg:</span> {dataRow.event.extendedProps.RoomName}
										</p>
									) : (
										<p
											className="text-gv-in-calendar"
											style={{
												color: '#212121',
												alignSelf: 'start',
												whiteSpace: 'pre-wrap',
												textAlign: 'start',
												fontSize: 11.9,
												fontWeight: '500'
											}}
										>
											<span className="title">Phòng:</span> Online
										</p>
									)} */}
								</div>
							</button>
						</div>
						<div className="wrapper-schedule wrapper-schedule-mobile">
							<button className={`btn-edit-title ${getStatusSchedule()}`}>
								<AiOutlineCalendar className={`${getStatusScheduleTime()} !text-[26px] p-0`} />
							</button>
						</div>
					</Popover>
				</>
			)}
		</>
	)
}

export default ScheduleCalendar
