import { Form, InputNumber, Modal, Select, Tooltip } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { scheduleApi } from '~/api/schedule'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import { setRoomEdit, setTeacherEdit } from '~/store/classReducer'
import DatePickerField from '../FormControl/DatePickerField'
import TextBoxField from '../FormControl/TextBoxField'
import PrimaryButton from '../Primary/Button'
import { classApi } from '~/api/class'

import { formRequired } from '~/common/libs/others/form'
import ModalFooter from '../Custom/Modal/ModalFooter'
import { DeleteOutlined } from '@ant-design/icons'
import { RiDeleteBin6Line } from 'react-icons/ri'

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
	const [openModalAdd, setOpenModalAdd] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [scheduleList, setScheduleList] = useState<Schedule[]>([])
	const [form] = Form.useForm()
	const router = useRouter()
	const teacher = useSelector((state: RootState) => state.class.teacherEdit)
	const room = useSelector((state: RootState) => state.class.roomEdit)

	const { class: slug, BranchId, CurriculumId, Type } = router.query

	const infoClass = useSelector((state: RootState) => state.class.infoClass)

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
			console.log(1)
			return false
		} else {
			const include = scheduleList?.findIndex(
				(e) => new Date(e.StartTime).getTime() > new Date(start).getTime() && new Date(e.EndTime).getTime() < new Date(end).getTime()
			)
			if (include > -1) {
				console.log(2)
				return false
			} else {
				const include_right = scheduleList?.findIndex(
					(e) => new Date(e.StartTime).getTime() >= new Date(start).getTime() && new Date(e.StartTime).getTime() <= new Date(end).getTime()
				)
				if (include_right > -1) {
					console.log(3)
					return false
				} else {
					const include_left = scheduleList?.findIndex(
						(e) => new Date(e.EndTime).getTime() >= new Date(start).getTime() && new Date(e.EndTime).getTime() <= new Date(end).getTime()
					)
					if (include_left > -1) {
						console.log(4)
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
									onClick={() => {
										form.setFields([
											{
												name: 'StartTime',
												value: _item.StartTime
											},
											{
												name: 'EndTime',
												value: _item.EndTime
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
