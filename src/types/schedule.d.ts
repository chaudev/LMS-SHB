type ISchedule = IBaseApi<{
	ClassId: number
	BranchId: number
	RoomId: number
	StartTime: string
	EndTime: string
	TeacherId: number
	TeacherAttendanceId: number
	RoomName: string
	RoomCode: string
	TeacherName: string
	TeacherCode: string
	Status: number
	StatusName: string
	Button: number
	ButtonName: string
	IsEndZoom: boolean
	ZoomId: number
	ZoomPass: string
	SignatureTeacher: any
	SignatureStudent: any
	ZoomConfigId: any
	SalaryId: string
	TeachingFee: any
	Note: ''
	Id: number & T
}>

type TGetScheduleByRoom = {
	from: string
	to: string
	classIds?: string
	branchIds?: string
	teacherIds?: string
	roomIds?: string
	programIds?: string
	scheduleIndex?: number
	timeFrom?: string
	timeTo?: string
}
type TScheduleByRoomResponse = {
	Rooms: TScheduleByRoomResponseRoom[]
	ScheduleByRoom: TScheduleByRoom[]
}
type TScheduleByRoomResponseRoom = {
	RoomId: number
	RoomName: string
}
type TScheduleByRoom = {
	IndexDayOfWeek: number
	DayOfWeek: number
	DayOfWeekName: string
	Date: string
	StudyTimes: TScheduleByRoomStudyTime[]
}
type TScheduleByRoomStudyTime = {
	StudyTimeId: number
	StudyTimeName: string
	Rooms: TScheduleByRoomStudyTimeRoom[]
}
type TScheduleByRoomStudyTimeRoom = {
	RoomId: number
	RoomName: string
	Schedules: TScheduleByRoomStudyTimeRoomSchedule[]
}
type TScheduleByRoomStudyTimeRoomSchedule = {
	ClassId: number
	ClassName: string
	ScheduleCurrent: number
	ScheduleTotal: number
	TotalStudent: number
	TeacherId: number
	TeacherName: string
}
