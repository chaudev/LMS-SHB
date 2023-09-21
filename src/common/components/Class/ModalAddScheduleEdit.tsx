import { DatePicker, Form, InputNumber, Modal, Select, Tooltip } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { scheduleApi } from '~/api/schedule'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import { setRoomEdit, setTeacherEdit } from '~/store/classReducer'
import DatePickerField from '../FormControl/DatePickerField'
import TextBoxField from '../FormControl/TextBoxField'
import PrimaryButton from '../Primary/Button'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { formRequired } from '~/common/libs/others/form'
import ModalFooter from '../Custom/Modal/ModalFooter'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'

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
}

const ModalAddScheduleEdit = (props) => {
	const { checkTeacherAvailable, checkRoomAvailable, getListSchedule, paramsSchedule } = props
	const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)
	const [stydyTime, setStydyTime] = useState<any>()
	const [timeStudySelect, setTimeStudySelect] = useState<any>(null)
	const [studyDaySelect, setStudyDaySelect] = useState<any>(null)
	const [onShow, setOnShow] = useState<number>(0)
	const [scheduleList, setScheduleList] = useState<Schedule[]>([])
	const [form] = Form.useForm()
	const router = useRouter()
	const teacher = useSelector((state: RootState) => state.class.teacherEdit)
	const room = useSelector((state: RootState) => state.class.roomEdit)

	const { class: slug, BranchId, CurriculumId, Type } = router.query

	const infoClass = useSelector((state: RootState) => state.class.infoClass)

	useEffect(() => {
		getStudyTime()
	}, [])

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

	const checkSchedule = (start: any, end: any) => {
		const between = scheduleList?.findIndex(
			(e) => new Date(e.StartTime).getTime() <= new Date(start).getTime() && new Date(e.EndTime).getTime() >= new Date(end).getTime()
		)
		if (between > -1) {
			return false
		} else {
			const include = scheduleList?.findIndex(
				(e) => new Date(e.StartTime).getTime() > new Date(start).getTime() && new Date(e.EndTime).getTime() < new Date(end).getTime()
			)
			if (include > -1) {
				return false
			} else {
				const include_right = scheduleList?.findIndex(
					(e) => new Date(e.StartTime).getTime() >= new Date(start).getTime() && new Date(e.StartTime).getTime() <= new Date(end).getTime()
				)
				if (include_right > -1) {
					return false
				} else {
					const include_left = scheduleList?.findIndex(
						(e) => new Date(e.EndTime).getTime() >= new Date(start).getTime() && new Date(e.EndTime).getTime() <= new Date(end).getTime()
					)
					if (include_left > -1) {
						return false
					} else {
						console.log(5)
						return true
					}
				}
			}
		}
	}

	const onSubmit = async (data) => {
		if (moment(data.StartTime).format() < moment(data.EndTime).format()) {
			let DATA_CHECK = {
				ClassId: parseInt(slug.toString()),
				RoomId: data.RoomId || 0,
				StartTime: moment(data.StartTime).format(),
				EndTime: moment(data.EndTime).format(),
				TeacherId: data.TeacherId.split('-')[0]
			}
			try {
				const res = await scheduleApi.checkTime(DATA_CHECK)
				if (res.status === 200) {
					if (checkSchedule(data.StartTime, data.EndTime)) {
						let DATA_SUBMIT = {
							Id: `${moment(data.StartTime).format()}&${moment(data.EndTime).format()}`,
							ClassId: parseInt(slug.toString()),
							RoomId: data.RoomId,
							StartTime: data.StartTime,
							// StartTime: moment(data.StartTime).format(),
							EndTime: data.EndTime,
							// EndTime: moment(data.EndTime).format(),
							TeacherId: data.TeacherId,
							TeachingFee: data.TeachingFee,
							Note: data.Note
						}
						setScheduleList((prev) => [...prev, DATA_SUBMIT])
						form.resetFields()
					} else {
						ShowNoti('error', 'Trùng lịch')
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
				StartTime: moment(e.StartTime).format(),
				EndTime: moment(e.EndTime).format(),
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
				ShowNoti('success', res.data.message)
			}
			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
			ShowNoti('error', err.message)
		}
	}

	const onChangeDate = (v) => {
		setStudyDaySelect(v)
		const date = new Date(v).toLocaleDateString()
		const startTime = form.getFieldValue('StartTime')
		const dateTime = new Date(startTime).toLocaleDateString()
		if (!!dateTime) {
			if (timeStudySelect) {
				form.setFieldValue('StartTime', dayjs(`${date} ${timeStudySelect.split('&')[0]}`, 'MM/DD/YYYY HH:mm'))
			} else {
				form.setFieldValue('StartTime', dayjs(`${date} 00:00`, 'MM/DD/YYYY HH:mm'))
			}
		} else {
			form.setFieldValue('StartTime', dayjs(`${date} 00:00`, 'MM/DD/YYYY HH:mm'))
		}

		if (onShow < 2) {
			setOnShow(onShow + 1)
		}
	}
	const handleChange = (v: string) => {
		setTimeStudySelect(v)
		// console.log('Data quis haha: ', v)
		const startTime = form.getFieldValue('StartTime')
		const date = new Date(startTime).toLocaleDateString()
		const time = v?.split('&')
		// var followingDay = new Date(new Date(startTime).getTime() + 86400000);
		// console.log('quisssss: ',date,  followingDay.toLocaleDateString())
		if (date) {
			const hhS = time[0].split(':')[0]
			const hhE = time[1].split(':')[0]
			form.setFieldValue('StartTime', dayjs(`${date} ${time[0]}`, 'MM/DD/YYYY HH:mm'))
			if (Number(hhS) <= Number(hhE)) {
				form.setFieldValue('EndTime', dayjs(`${date} ${time[1]}`, 'MM/DD/YYYY HH:mm'))
			} else {
				var followingDay = new Date(new Date(date).getTime() + 86400000).toLocaleDateString()

				form.setFieldValue('EndTime', dayjs(`${followingDay} ${time[1]}`, 'MM/DD/YYYY HH:mm'))
			}
		} else {
			const currenDate = new Date().toLocaleDateString()
			form.setFieldValue('StartTime', dayjs(`${currenDate} ${time[0]}`, 'MM/DD/YYYY HH:mm'))
		}
		if (onShow < 2) {
			setOnShow(onShow + 1)
		}
	}

	return (
		<>
			<PrimaryButton onClick={() => setOpenModalAdd(true)} className="ml-3" background="green" type="button" icon="add">
				Thêm lịch
			</PrimaryButton>

			<Modal
				title="Thêm buổi học"
				open={openModalAdd}
				onCancel={_cancel}
				centered
				footer={
					<ModalFooter
						hideOK={scheduleList?.length < 1}
						loading={isLoading}
						onOK={handleSave}
						onCancel={form.submit}
						disable={scheduleList.length < 1}
					/>
				}
				width={scheduleList?.length > 0 ? 850 : 500}
			>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div
						style={{
							flex: 55
						}}
					>
						<div
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'space-between',
								flex: 1,
								marginBottom: 20
							}}
						>
							<div
								style={{
									flex: 50
								}}
							>
								<div style={{ fontWeight: '600', marginBottom: 6 }}>Ngày học</div>
								<DatePicker
									value={studyDaySelect}
									format="DD/MM/YYYY"
									placeholder="Chọn ngày học"
									onChange={onChangeDate}
									style={{ width: '100%', borderRadius: 6 }}
								/>
							</div>
							<div
								style={{
									flex: 50,
									marginLeft: 20
								}}
							>
								<div style={{ fontWeight: '600', marginBottom: 6 }}>Ca học</div>
								<Select
									disabled={studyDaySelect === null}
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
						</div>

						<Form form={form} layout="vertical" onFinish={onSubmit}>
							{onShow == 2 && (
								<>
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
								</>
							)}
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
					{scheduleList?.length > 0 && (
						<div
							className="schedule-list-container"
							style={{
								maxHeight: Number(Type) === 1 ? '75vh' : '60vh'
							}}
						>
							{scheduleList?.map((_item) => (
								<div
									className="schedule-list-item"
									// onClick={() => {
									// 	form.setFields([
									// 		{
									// 			name: 'StartTime',
									// 			value: _item.StartTime
									// 		},
									// 		{
									// 			name: 'EndTime',
									// 			value: _item.EndTime
									// 		},
									// 		{
									// 			name: 'TeacherId',
									// 			value: _item.TeacherId
									// 		},
									// 		{
									// 			name: 'TeachingFee',
									// 			value: _item.TeachingFee
									// 		},
									// 		{
									// 			name: 'Note',
									// 			value: _item.Note
									// 		}
									// 	])
									// }}
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
											onClick={() => {
												setScheduleList(scheduleList?.filter((e) => e.Id !== _item.Id))
											}}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</Modal>
		</>
	)
}

export default ModalAddScheduleEdit
