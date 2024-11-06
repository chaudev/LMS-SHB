type TEvaluationTime = {
	Name: string
	SampleEvaluationFormId: number
	SampleEvaluationFormName: string
	RoleId: number
	RoleName: string
	Date: string
	BranchId: number
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostEvaluationTime = {
	Name: string
	SampleEvaluationFormId: number
	RoleId: number
	Date: string
	BranchId: number
}

type TPutEvaluationTime = {
	SampleEvaluationFormId: number
	RoleId: number
	Date: string
	Name: string
	Id: number
}

// statistical
type TEvaluationStatistical = {
	Name: string
	Code: string
	ListGroup: TListGroup[]
}

type TListGroup = {
	Name: string
	Description: string
	Type: 'MultipleChoice' | 'Essay' | 'Evaluate'
	ListQuestion: TListQuestion[]
}

type TListQuestion = {
	Content: string
	Type: 'MultipleChoice' | 'Essay' | 'Evaluate'
	ListEssay: string[]
	ListOption: TListOption[]
}

type TListOption = {
	Content: string
	Point: number
	TotalChoose: number
}
