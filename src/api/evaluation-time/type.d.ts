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
