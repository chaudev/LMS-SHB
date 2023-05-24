type IMajors = {
	Name: string
	Thumbnail: string
	Price: number
	Description: string
	Status:number,
	StatusName:string
	Id: number
}

type IMajorsRegistration  = {
	MajorsId: number
	MajorsName: string
	StudentId: number
	StudentName: string
	TotalPrice: number
	Paid: number
	GiftId: number
	GiftName: string
	GiftThumbnail: ''
	PaymentTypeId: number
	PaymentTypeName: string
	Note: string
	Status: number
	StatusName: string
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type IMajorsRegistrationAvailble = {
	StudentId: number
	StudentName: string
	StudentCode: string
	Avatar: string
	HasMajors: boolean
	Email: string
	Mobile: string
}
