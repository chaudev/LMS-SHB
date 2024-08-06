type TParamsGetUserEvaluationForm = {
	evaluationTimeId: number
	pageIndex: number
	pageSize: number
	search?: string
}

type TUserEvaluationForm = {
	UserId: number
	FullName: string
	UserCode: string
	AssessorId: number
	AssessorName: string
	AssessorCode: string
	EvaluationTimeId: number
	EvaluationTimeName: string
	EvaluationFormId: number
	EvaluationFormName: string
	Status: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TUserEvaluationFormList = {
	FullName: string
	IsSent: boolean
	UserCode: string
	UserId: number
}

// details
type TUserEvaluationDetail = {
	AssessorCode: string
	AssessorId: number
	AssessorName: string
	EvaluationFormDescription: string
	EvaluationFormName: string
	EvaluationTimeName: string
	FullName: string
	Id: number
	Status: 'Waiting' | 'Done'
	UserCode: string
	UserId: number
	EvaluationGroupDetails: TGroupDetail[]
}

// submit
type TSubmitUserEvaluationForm = {
	EvaluationGroupDetails: TGroupDetail[]
	Id: number
}

type TGroupDetail = {
	Id: number
	EvaluationFormId: number
	Name: string
	Description: string
	Index: number
	Type: 'MultipleChoice' | 'Essay' | 'Evaluate'
	EvaluationQuestionDetails: TQuestionDetail[]
}

type TQuestionDetail = {
	Id: number
	EvaluationFormId: number
	EvaluationGroupId: number
	Type: 'MultipleChoice' | 'Essay' | 'Evaluate'
	Content: string
	Index: number
	Answer: string
	EvaluationOptionDetails: TOptionDetail[]
}

type TOptionDetail = {
	IsChoose: boolean
	Id: number
	EvaluationFormId: number
	EvaluationGroupId: number
	EvaluationQuestionId: number
	Content: string
	Index: number
	Point: number
}

// add
type TPostUserEvaluationForm = {
	UserIds: number[]
	EvaluationTimeId: number
}

// get me
type TParamsGetMe = {} & Omit<TParamsGetUserEvaluationForm, 'evaluationTimeId'>

type TUserEvaluationFormMe = {
	UserId: number
	FullName: string
	UserCode: string
	AssessorId: number
	AssessorName: string
	AssessorCode: string
	EvaluationTimeId: number
	EvaluationTimeName: string
	EvaluationFormId: number
	EvaluationFormName: string
	Status: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}
