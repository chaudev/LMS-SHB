type IAddDormitoryExtendRegistrationBody = {
	DormitoryRegistrationId: number
	StudentId: number
	DormitoryId: number
	DormitoryAreaId: number
	DormitoryRoomId: number
	ExtendDate: string
	Price: number
	Note: string
}

type IAddDormitoryExtendRegistrationRes = {
	DormitoryRegistrationId: number
	DormitoryId: number
	DormitoryName: any
	DormitoryAreaId: number
	DormitoryAreaName: any
	DormitoryRoomId: number
	DormitoryRoomName: any
	StudentId: number
	StudentName: any
	StudentCode: any
	StudentAvatar: any
	StartDate: any
	EndDate: any
	ExtendDate: string
	Price: number
	Note: string
	Status: number
	IsPayment: any
	StatusName: any
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}
