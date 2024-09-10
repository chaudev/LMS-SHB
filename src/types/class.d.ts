type TGetClassStudentAttendanceRateParams = {
	branchIds: string
	classIds: string
	search?: string
}

type TClassStudentAttendanceRate = {
	ClassId: number
	ClassName: string
	StudentId: number
	StudentName: string
	StudentCode: string
	StudentDOB: string
	StudentGender: number
	attendanceSchedule: number
	presentSchedule: number
	totalSchedule: number
	rateSchedule: number
}
