type TSaveGradesInClass = {
	ClassTranscriptDetailId: number
	ClassTranscriptId: number
	CreatedBy: string
	CreatedOn: string
	Id: number
	ModifiedBy: string
	ModifiedOn: string
	StudentCode: string
	StudentId: number
	StudentName: string
	Value: string
}

type TSaveGradesDetails = {
	ClassTranscriptDetailId: number
	Value: string
}

type TPostSaveGradesInClass = {
	ClassTranscriptId: number
	StudentId: number
	Details: TSaveGradesDetails[]
}
