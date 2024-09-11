type IContract = IBaseApi<{
	StudentId: number
	StudentName: string
	StudentCode: string
	MajorId: number
	MajorName: string
	Name: string
	ContractSigningDate: string
	ContractNumber: string
	Content: string
	PDFUrl: string
	QRCode: string
	FileString?: string
	Files?: { FileName: string; Link: string }[]
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}>

type TPostContract = {
	StudentId: number
	MajorId: number
	Content: string
	ContractSigningDate?: string
	ContractNumber?: string
}
