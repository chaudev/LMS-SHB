type IPaymentType = {
	Name: string
	Times: number
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
	Fit: boolean
}
type IPaymentTypeDetail = {
	PaymentTypeId: number
	Index: number
	Type: number
	ValueId: number
	Percent: number
	Price?: number
	TypeName: string
	ValueName: string
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}
