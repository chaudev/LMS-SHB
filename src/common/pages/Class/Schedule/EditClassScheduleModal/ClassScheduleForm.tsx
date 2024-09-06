import { useQuery } from '@tanstack/react-query'
import { Form, Select, Tooltip } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import moment, { Moment } from 'moment'
import { useEffect } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import { classApi } from '~/api/class'
import DatePickerField from '~/common/components/FormControl/DatePickerField'
import InputMoneyField from '~/common/components/FormControl/InputNumberField'
import TextBoxField from '~/common/components/FormControl/TextBoxField'

export type TClassScheduleForm = {
	StartTime: Moment
	EndTime: Moment
	TeacherId: number
	RoomId: number
	TeachingFee: number
	Note: string
}

type TDefaultData = {
	StartTime: string
	EndTime: string
	TeacherId: number
	RoomId: number
	TeachingFee: number
	Note: string
}

type TProps = {
	defaultData?: TDefaultData
	form: FormInstance<TClassScheduleForm>
	onSubmit: (data) => void
	scheduleId: number
	branchId: number
	curriculumId: number
}

const ClassScheduleForm = ({ defaultData, form, onSubmit, scheduleId, branchId, curriculumId }: TProps) => {
	const startTime = Form.useWatch('StartTime', form)
	const endTime = Form.useWatch('EndTime', form)

	const dependencies = [scheduleId, branchId, curriculumId, startTime, endTime]

	const { data: teacherAvailableData } = useQuery({
		queryKey: [classApi.keyCheckTeacherAvailable, [dependencies]],
		queryFn: () => {
			return classApi
				.checkTeacherAvailable({
					scheduleId,
					branchId,
					curriculumId,
					startTime: startTime ? moment(startTime).format() : undefined,
					endTime: endTime ? moment(endTime).format() : undefined
				})
				.then((data) => data.data)
		},
		enabled: !!branchId && !!curriculumId && !!startTime && !!endTime
	})

	const { data: roomAvailableData } = useQuery({
		queryKey: [classApi.keyCheckRoomAvailable, [dependencies]],
		queryFn: () => {
			return classApi
				.checkRoomAvailable({
					scheduleId,
					branchId,
					curriculumId,
					startTime: startTime ? moment(startTime).format() : undefined,
					endTime: endTime ? moment(endTime).format() : undefined
				})
				.then((data) => data.data)
		},
		enabled: !!branchId && !!curriculumId && !!startTime && !!endTime
	})

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({
				StartTime: moment(defaultData.StartTime),
				EndTime: moment(defaultData.EndTime),
				TeacherId: defaultData.TeacherId,
				RoomId: defaultData.RoomId,
				TeachingFee: defaultData.TeachingFee,
				Note: defaultData.Note
			})
		}
	}, [defaultData])

	return (
		<Form form={form} layout="vertical" className="grid grid-cols-2 gap-x-4" onFinish={onSubmit}>
			<DatePickerField
				className="col-span-2 w500:col-span-1"
				mode="single"
				showTime={'HH:mm'}
				picker="showTime"
				format="DD/MM/YYYY HH:mm"
				label="Giờ bắt đầu"
				name="StartTime"
			/>

			<DatePickerField
				mode="single"
				className="col-span-2 w500:col-span-1"
				showTime={'HH:mm'}
				picker="showTime"
				format="DD/MM/YYYY HH:mm"
				label="Giờ kết thúc"
				name="EndTime"
			/>

			<Form.Item name="TeacherId" className="col-span-2" label="Giáo viên">
				<Select placeholder="Chọn giáo viên">
					{(teacherAvailableData?.data || [])?.map((item) => {
						return (
							<Select.Option disabled={!item.Fit} key={item.TeacherId} value={item.TeacherId}>
								<div className="flex items-center justify-between w-full">
									{item.TeacherName + ' - ' + item.TeacherCode}
									{!item.Fit ? (
										<Tooltip placement="right" title={!!item.Note ? item.Note : `Giáo viên ${item.TeacherName} bị trùng lịch`}>
											<AiOutlineWarning className="text-tw-red" />
										</Tooltip>
									) : null}
								</div>
							</Select.Option>
						)
					})}
				</Select>
			</Form.Item>

			<Form.Item className="col-span-2" name="RoomId" label="Phòng học">
				<Select placeholder="Chọn phòng học">
					{(roomAvailableData?.data || [])?.map((item) => {
						return (
							<Select.Option disabled={!item.Fit} key={item.RoomId} value={item.RoomId}>
								<div className="flex items-center justify-between w-full">
									{item.RoomName}
									{!item.Fit ? (
										<Tooltip placement="right" title={!!item.Note ? item.Note : `Phòng học ${item.RoomName} bị trùng lịch`}>
											<AiOutlineWarning className="text-tw-red" />
										</Tooltip>
									) : null}
								</div>
							</Select.Option>
						)
					})}
				</Select>
			</Form.Item>

			<InputMoneyField className="col-span-2" label="Lương / Buổi" name="TeachingFee" placeholder="Nhập mức lương" />

			<TextBoxField className="col-span-2" name="Note" label="Ghi chú" />
		</Form>
	)
}

export default ClassScheduleForm
