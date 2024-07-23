type TSampleTranscript = {
	Name: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TSampleTranscriptDetail = {
	SampleTranscriptId: number
	Name: string
	Type: string
	Index: number
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostSampleTranscriptDetail = {
	SampleTranscriptId: number
	Name: string
	Type: string
}

type TPutSampleTranscriptDetail = {
	Name: string
	Id: number
}

type TItem = {
	Id: number
	Index: number
}

type TPutChangeIndex = {
	Items: TItem[]
}
