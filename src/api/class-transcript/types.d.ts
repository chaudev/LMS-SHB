type TClassTranscript = {
	ClassId: number
	SampleTranscriptId: number
	Name: string
	Date: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostClassTranscript = {
	ClassId: number
	SampleTranscriptId: number
	Name: string
	Date: string
}

type TPutClassTranscript = {
	Name: string
	Date: string
	Id: number
}

type TPostClassTranscript = {
	ClassTranscriptId: number
	Name: string
	Type: string
	MaxValue?: string
}

type TClassTranscriptDetail = {
	ClassTranscriptId: number
	Name: string
	Type: string
	Index: number
	MaxValue: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPutClassTranscriptDetail = {
	ClassTranscriptId: number
	Name: string
	Type: string
	Index: number
	MaxValue: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}
