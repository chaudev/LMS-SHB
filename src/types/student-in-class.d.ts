type IStudentInClass = IBaseApi<{
	BranchId: number
	ClassId: number
	StudentId: number
	Warning: boolean
	Note: srting
	Type: number
	TypeName: srting
	ClassName: srting
	FullName: srting
	UserCode: srting
	Avatar: srting
	Mobile: srting
	Email: srting
	Id: number
	Enable: true
	CreatedOn: any
	CreatedBy: srting
	ModifiedOn: any
	ModifiedBy: srting
}>
type IAddStudentsToClass = IBaseApi<{
	ClassId: number
	StudentIds: number[]
	Note: string
	Type: number
}>
type IClassOfStudent = IBaseApi<{
	Name: string
	Thumbnail: null
	BranchId: number
	GradeId: number
	ProgramId: number
	CurriculumId: number
	StartDay: any
	EndDay: any
	Price: number
	Status: number
	StatusName: string
	AcademicId: number
	TeacherId: number
	Type: number
	TypeName: string
	MaxQuantity: number
	TotalStudent: any
	TotalLesson: any
	LessonCompleted: any
	ProgramName: string
	GradeName: string
	CurriculumName: string
	BranchName: string
	TeacherName: string
	AcademicName: string
	Id: number
	Enable: true
	CreatedOn: any
	CreatedBy: Admin
	ModifiedOn: any
	ModifiedBy: Admin
}>

type TStudentAboutToFinish = {
	StudentId: number
	FullName: string
	Gender: number
	UserCode: string
	Avatar: string
	Mobile: string
	Email: string
	TotalLesson: number
	TotalRow: number
}
