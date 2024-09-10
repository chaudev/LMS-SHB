type IRollUp = IBaseApi<{
    ClassId: number,
    StudentId: number,
    ScheduleId: number,
    Status: number,
    StatusName: string,
    LearningStatus: number,
    LearningStatusName: string,
    Note: string,
    FullName: string,
    UserCode: string
    ScheduleModel: any
}>

type IRollUpStudent = IBaseApi<{
    ClassId: number,
    StudentId: number,
    ScheduleId: number,
    Status: number,
    StatusName: string,
    LearningStatus: number,
    LearningStatusName: string,
    Note: string,
    FullName: string,
    UserCode: string
    ScheduleModel: any
}>

type TGetRollUpReport = {
	branchIds?: string
	classIds?: string
	from?: string
	to?: string
}

type TRollUpReport = {
	Header: TRollUpReportHeader[]
  	Data: TRollUpReportData[]
}
type TRollUpReportHeader = {
	Index: number
	Date: string
}
type TRollUpReportData = {
	StudentCode: string
	StudentName: string
	Present: number
	AbsenceAllow: number
	AbsenceNotAllow: number
	ClassId: number
	StudentId: number
	Dates: TRollUpReportDataDate[]
}
type TRollUpReportDataDate = {
	Index: number
	Date: string
	StudyTimes: TRollUpReportDataDateStudyTime[]
}
type TRollUpReportDataDateStudyTime = {
	StudyTime: string
	Status: number
	StatusName: string
}
