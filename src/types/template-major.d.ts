type TGetTemplateMajor = {
	majorId: number
	pageSize: number
	pageIndex: number
	search?: string
}

type TTemplateMajor = {
	Id: number
	MajorId: string
	Name: string
	Content: string
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostTemplateMajor = {
	MajorId: string
	Name: string
	Content: string
}

type TPutTemplateMajor = {
	Id: number
	Name: string
	Content: string
}

type TTemplateMajorGuide = {
	Code: string
	Name: string
}
