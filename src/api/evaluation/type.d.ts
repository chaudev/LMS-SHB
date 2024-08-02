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
