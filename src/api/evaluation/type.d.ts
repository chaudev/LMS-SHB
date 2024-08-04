type TSampleEvaluationFormItem = {
	Name: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostSampleEvaluationForm = {
	Name: string
}

type TPutSampleEvaluationForm = {
	Name: string
	Id: number
}

// ** api/SampleEvaluationGroup

type TSampleEvaluationGroup = {
	SampleEvaluationFormId: number
	Name: string
	Description: string
	Index: number
	Type: string
	IsHaveQuestion: boolean
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostSampleEvaluationGroup = {
	SampleEvaluationFormId: number
	Name: string
	Description: string
	Type: 'MultipleChoice' | 'Essay' | 'Evaluate'
}

type TPutSampleEvaluationGroup = {
	Name: string
	Description: string
	Type: 'MultipleChoice' | 'Essay' | 'Evaluate'
	Id: number
}

type TChangeIndexSampleEvaluationGroup = {
	Items: {
		Id: number
		Index: number
	}[]
}

// ** api/SampleEvaluationQuestion

type TSampleEvaluationQuestion = {
	SampleEvaluationFormId: number
	SampleEvaluationGroupId: number
	Type: string
	Content: string
	Index: number
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostSampleEvaluationQuestion = {
	SampleEvaluationGroupId: number
	Content: string
}

type TPutSampleEvaluationQuestion = {
	Id: number
	Content: string
}

type TChangeIndexSampleEvaluationQquestion = {} & TChangeIndexSampleEvaluationGroup

// ** api/SampleEvaluationOption

type TSampleEvaluationOption = {
	SampleEvaluationFormId: number
	SampleEvaluationGroupId: number
	SampleEvaluationQuestionId: number
	Content: string
	Index: number
	Point: number
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostSampleEvaluationOption = {
	SampleEvaluationQuestionId: number
	Content: string
	Point: number
}

type TPutSampleEvaluationOption = {
	Content: string
	Point: number
	Id: number
}

type TChangeIndexSampleEvaluationOption = {} & TChangeIndexSampleEvaluationGroup
