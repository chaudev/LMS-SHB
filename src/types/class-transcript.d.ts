type TGetClassTranscriptReport = {
	branchIds?: string
	classIds?: string
	sampleTranscriptIds?: string
}

type TClassTranscriptReport = {
	ClassTranscriptHeader: TClassTranscriptReportHeader[]
	Data: TClassTranscriptReportData[]
}
type TClassTranscriptReportHeader = {
	Id: number
	Name: string
	ClassTranscriptDetailHeader: TClassTranscriptReportHeaderDetail[]
}
type TClassTranscriptReportHeaderDetail = {
	Id: number
	Index: number
	Name: string
}
type TClassTranscriptReportData = {
	ClassId: number
	ClassName: string
	StudentId: number
	StudentCode: string
	StudentName: string
	StudentPhone: string
	StudentPhone2: string
	StudentEmail: string
	ParentId: number
	ParentName: string
	ParentCode: string
	ParentPhone: string
	ParentEmail: string
	SaleId: number
	SaleName: string
	SaleCode: string
	SaleMobile: string
	SaleEmail: string
	ClassTranscripts: TClassTranscriptReportDataClassTranscript[]
}
type TClassTranscriptReportDataClassTranscript = {
	Id: number
	Name: string
	Details: TClassTranscriptReportDataClassTranscriptDetail[]
}
type TClassTranscriptReportDataClassTranscriptDetail = {
	Id: number
	Index: number
	Name: string
	Type: string
	Value: number | string
}
