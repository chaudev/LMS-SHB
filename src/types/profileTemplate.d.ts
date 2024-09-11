type IProfileTemplate = IBaseApi<{
	Name: string
	Type: number
	Index: number
	Id: number
	MajorIds: string
	Majors: { Id: number; Name: string }[]
}>
