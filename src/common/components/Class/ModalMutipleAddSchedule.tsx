import { DatePicker, Empty, Form, InputNumber, Modal, Select, Tooltip } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { checkTime, scheduleApi } from '~/api/schedule'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import { setRoomEdit, setTeacherEdit } from '~/store/classReducer'
import DatePickerField from '../FormControl/DatePickerField'
import TextBoxField from '../FormControl/TextBoxField'
import PrimaryButton from '../Primary/Button'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { formRequired } from '~/common/libs/others/form'

import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import { CloseSquareOutlined, CloseSquareTwoTone, LeftSquareTwoTone, RightSquareFilled, RightSquareTwoTone } from '@ant-design/icons'
import ModalFooter from '../ModalFooter'

dayjs.extend(weekday)

dayjs.extend(localeData)

type Schedule = {
	Id: string
	ClassId: number
	RoomId: number
	StartTime: string
	EndTime: string
	TeacherId: string
	TeachingFee: number
	Note: string
	Active?: boolean
}

const { RangePicker } = DatePicker

const ModalMutipleAddSchedule = (props) => {
	const { checkTeacherAvailable, checkRoomAvailable, getListSchedule, paramsSchedule, daySelected, isEditSchedule } = props
	const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)
	const [stydyTime, setStydyTime] = useState<any>()
	const [timeStudySelect, setTimeStudySelect] = useState<string>(null)
	const [teacherId, setTeacherId] = useState<string>(null)
	const [studyDaySelect, setStudyDaySelect] = useState<any>(null)
	const [onShow, setOnShow] = useState<number>(0)
	const [roomId, setRoomId] = useState<number>(0)
	const [showDetail, setShowDetail] = useState<string>(null)
	const [scheduleList, setScheduleList] = useState<any[]>([])
	const [daysOfBetween, setDaysOfBetween] = useState<number>(0)
	const [form] = Form.useForm()
	const router = useRouter()
	const teacher = useSelector((state: RootState) => state.class.teacherEdit)
	const room = useSelector((state: RootState) => state.class.roomEdit)

	const { class: slug, BranchId, CurriculumId, Type } = router.query

	const infoClass = useSelector((state: RootState) => state.class.infoClass)

	useEffect(() => {
		getStudyTime()
	}, [])

	useEffect(() => {
		getStudyTime()
		if (daySelected) {
			var followingDay = new Date(new Date(daySelected[1]).getTime() - 86400000)
			setStudyDaySelect([dayjs(daySelected[0], 'MM/DD/YYYY'), dayjs(followingDay, 'MM/DD/YYYY')])
			calculateDate(daySelected[0], followingDay)
			if (isEditSchedule) {
				setOpenModalAdd(true)
			}
		}
	}, [daySelected])

	const getStudyTime = async () => {
		try {
			const res = await scheduleApi.getStudyTime()
			if (res.status === 200) {
				setStydyTime(res.data.data)
			}
		} catch (error) {}
	}

	const getDataAvailable = async () => {
		if (!!form.getFieldValue('StartTime') && !!form.getFieldValue('EndTime')) {
			await checkTeacherAvailable({
				branchId: BranchId || infoClass?.BranchId,
				curriculumId: CurriculumId || infoClass?.CurriculumId,
				startTime: moment(form.getFieldValue('StartTime')).format(),
				endTime: moment(form.getFieldValue('EndTime')).format()
			})

			await checkRoomAvailable({
				branchId: BranchId || infoClass?.BranchId,
				startTime: moment(form.getFieldValue('StartTime')).format(),
				endTime: moment(form.getFieldValue('EndTime')).format()
			})
		}
	}

	const checkDataAvailable = async (s: any, e: any) => {
		await checkTeacherAvailable({
			branchId: BranchId || infoClass?.BranchId,
			curriculumId: CurriculumId || infoClass?.CurriculumId,
			startTime: s,
			endTime: e
		})

		await checkRoomAvailable({
			branchId: BranchId || infoClass?.BranchId,
			startTime: s,
			endTime: e
		})
	}

	const checkSchedule = (id: any, start: any, end: any) => {
		const between = scheduleList?.findIndex(
			(e) => new Date(e.StartTime).getTime() <= new Date(start).getTime() && new Date(e.EndTime).getTime() >= new Date(end).getTime()
		)

		if (between > -1) {
			const check = id === scheduleList[between].Id

			if (!check) {
				console.log('Data check quis 1: ', id, scheduleList[between].Id)
				return false
			}
		} else {
			const include = scheduleList?.findIndex(
				(e) => new Date(e.StartTime).getTime() > new Date(start).getTime() && new Date(e.EndTime).getTime() < new Date(end).getTime()
			)
			if (include > -1) {
				const check = id === scheduleList[include].Id
				if (!check) {
					console.log('Data check quis 2: ', id, scheduleList[include].Id)
					return false
				}
			} else {
				const include_right = scheduleList?.findIndex(
					(e) => new Date(e.StartTime).getTime() >= new Date(start).getTime() && new Date(e.StartTime).getTime() <= new Date(end).getTime()
				)
				if (include_right > -1) {
					const check = id === scheduleList[include_right].Id
					if (!check) {
						console.log('Data check quis 2: ', id, scheduleList[include_right].Id)
						return false
					}
				} else {
					const include_left = scheduleList?.findIndex(
						(e) => new Date(e.EndTime).getTime() >= new Date(start).getTime() && new Date(e.EndTime).getTime() <= new Date(end).getTime()
					)
					if (include_left > -1) {
						const check = id === scheduleList[include_left].Id
						if (!check) {
							console.log('Data check quis 3: ', id, scheduleList[include_left].Id)
							return false
						}
					} else {
						return true
					}
				}
			}
		}
		return true
	}

	const updateState = (data) => {
		const getIndex = scheduleList.findIndex((item) => {
			return item.Id === data.Id
		})

		scheduleList[getIndex] = { ...data }

		setScheduleList([...scheduleList])
	}

	const onSubmit = async (data) => {
		if (new Date(data.StartTime).getTime() < new Date(data.EndTime).getTime()) {
			let DATA_CHECK = {
				ClassId: parseInt(slug.toString()),
				RoomId: data.RoomId || 0,
				StartTime: moment(new Date(data.StartTime)).format(),
				EndTime: moment(new Date(data.EndTime)).format(),
				TeacherId: data.TeacherId.split('-')[0]
			}
			try {
				const res = await scheduleApi.checkTime(DATA_CHECK)
				if (res.status === 200) {
					if (checkSchedule(showDetail, data.StartTime, data.EndTime)) {
						let DATA_SUBMIT = {
							Id: showDetail,
							ClassId: parseInt(slug.toString()),
							RoomId: data.RoomId,
							StartTime: data.StartTime,
							EndTime: data.EndTime,
							TeacherId: data.TeacherId,
							TeachingFee: data.TeachingFee,
							Note: data.Note,
							Active: true
						}
						updateState(DATA_SUBMIT)
						form.resetFields()
						setShowDetail(null)
					} else {
						ShowNoti('error', 'Lịch đã tồn tại!')
					}
				} else {
					ShowNoti('error', res.data.message)
				}
			} catch (err) {
				ShowNoti('error', err.message)
			}
		} else {
			ShowNoti('error', 'Ngày bắt đầu không được lớn hơn ngày kết thúc')
		}
	}

	function _cancel() {
		setStudyDaySelect([])
		setTeacherId(null)
		setShowDetail(null)
		setScheduleList([])
		setOnShow(0)
		setStudyDaySelect(null)
		setTimeStudySelect(null)
		form.resetFields()
		setTeacherEdit([])
		setRoomEdit([])
		setOpenModalAdd(false)
	}

	const fromatTime = (date: any) => {
		const date_time = new Date(date)
		const day = date_time.toLocaleDateString()
		const hh = date_time.getHours()
		const mm = date_time.getMinutes()
		return `${day} ${hh !== 0 ? (hh < 10 ? `0${hh}` : hh) : '00'}:${mm !== 0 ? (mm < 10 ? `0${mm}` : mm) : '00'}`
	}

	const handleSave = async () => {
		setIsLoading(true)
		const DATA_SUBMIT = []
		scheduleList?.map((e) =>
			DATA_SUBMIT.push({
				ClassId: parseInt(slug.toString()),
				RoomId: e.RoomId || 0,
				StartTime: moment(new Date(e.StartTime)).format(),
				EndTime: moment(new Date(e.EndTime)).format(),
				TeacherId: e.TeacherId.split('-')[0],
				Note: e.Note,
				TeachingFee: 0
			})
		)

		try {
			const res = await scheduleApi.adds(DATA_SUBMIT)
			if (res.status === 200) {
				getListSchedule(paramsSchedule)
				setOpenModalAdd(false)
				form.resetFields()
				setScheduleList([])
				setStudyDaySelect([])
				setTeacherId(null)
				setShowDetail(null)
				setScheduleList([])
				setOnShow(0)
				setStudyDaySelect(null)
				setTimeStudySelect(null)
				ShowNoti('success', res.data.message)
			}
			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
			ShowNoti('error', err.message)
		}
	}

	const calculateDate = (s: any, e: any) => {
		var date1 = new Date(s)
		var date2 = new Date(e)

		checkDataAvailable(moment(date1).format(), moment(date2).format())

		// To calculate the time difference of two dates
		var Difference_In_Time = date2.getTime() - date1.getTime()

		// To calculate the no. of days between two dates
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
		setDaysOfBetween(Difference_In_Days)

		setTeacherId(null)
	}

	const onChangeDate = (v:any) => {
		if (v) {
			calculateDate(v[0], v[1])
			setStudyDaySelect(v)
		} else {
			setDaysOfBetween(0)
			setTeacherId(null)
			setStudyDaySelect([])
		}
	}
	const handleChange = (v: string) => {
		var date1 = new Date(studyDaySelect[0]).toLocaleDateString()
		var date2 = new Date(studyDaySelect[1]).toLocaleDateString()
		var time = v.split('&')
		setTimeStudySelect(v)
		checkDataAvailable(moment(new Date(`${date1} ${time[0]}`)).format(), moment(new Date(`${date2} ${time[1]}`)).format())
	}

	const handleGenerate = () => {
		setScheduleList([])
		let dateTeam = new Date(studyDaySelect[0])
		const timeStudy = timeStudySelect.split('&')
		if (studyDaySelect && teacherId && timeStudySelect) {
			;[...Array(daysOfBetween + 1)].map(async (e, index) => {
				let DATA_CHECK = {
					ClassId: parseInt(slug.toString()),
					RoomId: roomId || 0,
					StartTime: moment(new Date(`${dateTeam.toLocaleDateString()} ${timeStudy[0]}`)).format(),
					EndTime: moment(new Date(`${dateTeam.toLocaleDateString()} ${timeStudy[1]}`)).format(),
					TeacherId: teacherId.split('-')[0]
				}
				await checkTime(DATA_CHECK)
					.then((res) => {
						const data = {
							Id: `${dateTeam.toLocaleDateString()} ${timeStudy[0]}`,
							StartTime: `${dateTeam.toLocaleDateString()} ${timeStudy[0]}`,
							EndTime: `${dateTeam.toLocaleDateString()} ${timeStudy[1]}`,
							RoomId: roomId || 0,
							TeacherId: teacherId,
							Active: true
						}
						setScheduleList((prev) => [...prev, data])
						var followingDay = new Date(new Date(dateTeam).getTime() + 86400000)
						dateTeam = followingDay
					})
					.catch((err) => {
						const data = {
							Id: `${dateTeam.toLocaleDateString()} ${timeStudy[0]}`,
							StartTime: `${dateTeam.toLocaleDateString()} ${timeStudy[0]}`,
							EndTime: `${dateTeam.toLocaleDateString()} ${timeStudy[1]}`,
							RoomId: roomId || 0,
							TeacherId: teacherId,
							Active: false
						}
						setScheduleList((prev) => [...prev, data])
						var followingDay = new Date(new Date(dateTeam).getTime() + 86400000)
						dateTeam = followingDay
					})
			})
		}
	}

	return (
		<>
			<PrimaryButton onClick={() => setOpenModalAdd(true)} className="ml-3" background="green" type="button" icon="add">
				Thêm lịch nhanh
			</PrimaryButton>

			<Modal
				title="Thêm nhiều buổi học"
				open={openModalAdd}
				onCancel={_cancel}
				centered
				footer={<ModalFooter hideOK={scheduleList?.length < 1} loading={isLoading} onOK={handleSave} onCancel={_cancel} />}
				width={showDetail !== null ? 1200 : 850}
			>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div
						className="schedule-list-container"
						style={{
							flex: 50,
							maxHeight: Number(Type) === 1 ? '40vh' : '32vh'
						}}
					>
						<div
							style={{
								flex: 1,
								marginBottom: 20
							}}
						>
							<div style={{ width: '100%', marginBottom: 20 }}>
								<div style={{ fontWeight: '600', marginBottom: 6 }}>Ngày học</div>
								<RangePicker
									value={studyDaySelect}
									format="MM/DD/YYYY"
									onChange={onChangeDate}
									style={{ width: '100%', height: 35, borderRadius: 6 }}
								/>
							</div>
							<div style={{ marginBottom: 20 }}>
								<div style={{ fontWeight: '600', marginBottom: 6 }}>Ca học</div>
								<Select
									disabled={daysOfBetween === 0}
									value={timeStudySelect}
									style={{ width: '100%' }}
									placeholder="Chọn ca học"
									onChange={(v) => handleChange(v)}
								>
									{stydyTime?.map((e) => {
										return (
											<Select.Option key={e.Id} label={e.Name} value={`${e.StartTime}&${e.EndTime}`}>
												{e.Name}
											</Select.Option>
										)
									})}
								</Select>
							</div>
							<div style={{ marginBottom: 20 }}>
								<div style={{ fontWeight: '600', marginBottom: 6 }}>Giáo viên</div>
								<Select
									disabled={daysOfBetween === 0}
									value={teacherId}
									onChange={setTeacherId}
									style={{ width: '100%' }}
									placeholder="Chọn giáo viên"
								>
									{teacher.map((item) => {
										return (
											<Select.Option disabled={!item.Fit} key={item.TeacherId} value={`${item.TeacherId}-${item.TeacherName}`}>
												<div className="flex items-center justify-between w-full">
													{item.TeacherName + ' - ' + item.TeacherCode}
													{!item.Fit ? (
														<Tooltip placement="right" title={item.Note}>
															<AiOutlineWarning className="text-tw-red" />
														</Tooltip>
													) : null}
												</div>
											</Select.Option>
										)
									})}
								</Select>
							</div>
							{!!Type && parseInt(Type.toString()) == 1 && (
								<div>
									<div style={{ fontWeight: '600', marginBottom: 6 }}>Phòng học</div>
									<Select
										onChange={setRoomId}
										disabled={stydyTime === null}
										style={{ width: '100%', height: 35 }}
										placeholder="Chọn phòng học"
									>
										{room.map((item) => {
											return (
												<Select.Option disabled={!item.Fit} key={item.RoomId} value={item.RoomId}>
													<div className="flex items-center justify-between w-full">
														{item.RoomName}
														{!item.Fit ? (
															<Tooltip placement="right" title={item.Note}>
																<AiOutlineWarning className="text-tw-red" />
															</Tooltip>
														) : null}
													</div>
												</Select.Option>
											)
										})}
									</Select>
								</div>
							)}
						</div>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', flex: 5 }}>
						{daysOfBetween > 0 && stydyTime && teacherId && (
							<RightSquareTwoTone onClick={handleGenerate} style={{ fontSize: 30, cursor: 'pointer' }} />
						)}
					</div>

					<div
						className="schedule-list-container"
						style={{
							maxHeight: Number(Type) === 1 ? '75vh' : '60vh'
						}}
					>
						{scheduleList.length > 0 ? (
							scheduleList?.map((_item) => {
								const isCurrent = showDetail === _item.Id
								return (
									<div
										className="schedule-list-item"
										style={{
											border: _item?.Active ? '' : '1px solid #C94A4F',
											backgroundColor: isCurrent ? '#b7dcf7' : '#fff'
										}}
										onClick={() => {
											form.setFields([
												{
													name: 'StartTime',
													value: dayjs(_item.StartTime, 'MM/DD/YYYY HH:mm')
												},
												{
													name: 'EndTime',
													value: dayjs(_item.EndTime, 'MM/DD/YYYY HH:mm')
												},
												{
													name: 'RoomId',
													value: _item.RoomId || 0
												},
												{
													name: 'TeacherId',
													value: _item.TeacherId
												},
												{
													name: 'TeachingFee',
													value: _item.TeachingFee
												},
												{
													name: 'Note',
													value: _item.Note
												}
											])
											setShowDetail(_item.Id)
										}}
									>
										<div className="schedule-list-item-left">
											<div className="schedule-list-title">{_item.TeacherId.split('-')[1]}</div>
											<div style={{ display: 'flex', marginTop: 3, marginBottom: 3 }}>
												<div style={{ height: 4, width: 20, backgroundColor: '#0A8FDC', borderRadius: 3, marginRight: 6 }} />
												<div style={{ height: 4, width: 20, backgroundColor: '#FF0000', borderRadius: 3 }} />
											</div>
											<div className="schedule-list-footer">
												<span className="schedule-list-item-time" style={{ marginRight: 5 }}>
													{fromatTime(_item.StartTime)}
												</span>
												- <span style={{ marginLeft: 5 }}>{fromatTime(_item.EndTime)}</span>
											</div>
										</div>
										<div className="schedule-list-right">
											<RiDeleteBin6Line
												size={16}
												style={{
													color: '#C94A4F'
												}}
												onClick={(e) => {
													e.stopPropagation()
													if (isCurrent) {
														setShowDetail(null)
													}
													setScheduleList(scheduleList?.filter((e) => e.Id !== _item.Id))
												}}
											/>
										</div>
									</div>
								)
							})
						) : (
							<div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<Empty />
							</div>
						)}
					</div>
					{showDetail !== null && (
						<>
							<div style={{ display: 'flex', justifyContent: 'center', flex: 5, flexDirection: 'column' }}>
								<div style={{ marginTop: -50 }}>
									<LeftSquareTwoTone onClick={form.submit} style={{ fontSize: 30, cursor: 'pointer' }} />
									<CloseSquareOutlined onClick={() => setShowDetail(null)} style={{ fontSize: 30, cursor: 'pointer', color: '#C94A4F' }} />
								</div>
							</div>
							<div
								className="schedule-list-container"
								style={{
									flex: 50,
									maxHeight: Number(Type) === 1 ? '75vh' : '60vh'
								}}
							>
								<Form form={form} layout="vertical" onFinish={onSubmit}>
									<DatePickerField
										mode="single"
										showTime={'HH:mm'}
										picker="showTime"
										format="DD/MM/YYYY HH:mm"
										label="Giờ bắt đầu"
										name="StartTime"
										onChange={getDataAvailable}
									/>
									<DatePickerField
										mode="single"
										showTime={'HH:mm'}
										picker="showTime"
										format="DD/MM/YYYY HH:mm"
										label="Giờ kết thúc"
										name="EndTime"
										onChange={getDataAvailable}
									/>
									<Form.Item name="TeacherId" label="Giáo viên" rules={formRequired}>
										<Select placeholder="Chọn giáo viên">
											{teacher.map((item) => {
												return (
													<Select.Option disabled={!item.Fit} key={item.TeacherId} value={`${item.TeacherId}-${item.TeacherName}`}>
														<div className="flex items-center justify-between w-full">
															{item.TeacherName + ' - ' + item.TeacherCode}
															{!item.Fit ? (
																<Tooltip placement="right" title={item.Note}>
																	<AiOutlineWarning className="text-tw-red" />
																</Tooltip>
															) : null}
														</div>
													</Select.Option>
												)
											})}
										</Select>
									</Form.Item>
									<Form.Item name="TeachingFee" label="Lương/buổi">
										<InputNumber style={{ width: '100%', borderRadius: 6 }} min={0} max={9999999999} defaultValue={0} />
									</Form.Item>

									{!!Type && parseInt(Type.toString()) == 1 ? (
										<Form.Item name="RoomId" label="Phòng học">
											<Select placeholder="Chọn phòng học">
												{room.map((item) => {
													return (
														<Select.Option disabled={!item.Fit} key={item.RoomId} value={item.RoomId}>
															<div className="flex items-center justify-between w-full">
																{item.RoomName}
																{!item.Fit ? (
																	<Tooltip placement="right" title={item.Note}>
																		<AiOutlineWarning className="text-tw-red" />
																	</Tooltip>
																) : null}
															</div>
														</Select.Option>
													)
												})}
											</Select>
										</Form.Item>
									) : null}

									<TextBoxField name="Note" label="Ghi chú" />
								</Form>
							</div>
						</>
					)}
				</div>
			</Modal>
		</>
	)
}

export default ModalMutipleAddSchedule
