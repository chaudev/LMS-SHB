type TCreacteDormitoryWarning = {
	UserId: number
	DormitoryId: number
	DormitoryAreaId: number
	DormitoryRoomId: number
	WarningLevel: number
	Note: any
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TCreacteDormitoryWarningBody = {
	UserId: number
	DormitoryId: number
	DormitoryAreaId: number
	DormitoryRoomId: number
	WarningLevel: string
	Note: string
}

type TQueryDormitoryWarning = {
	Sort?: 0 | 1
	SortType?: boolean
	FromDate?: string
	ToDate?: string
	WarningLevel?: 'Nhe' | 'Vua' | 'Nang' | ''
	PageSize?: number
	PageIndex?: number
	Search?: string
}

type TResultDormitoryWarning<T = any> = {
	message: string
	totalRow: number
	data: T
}

type TDormitoryWarningRules = {
	UserId: number
	FullName: string
	UserCode: string
	DOB: string
	Gender: number
	Avatar: any
	Mobile: string
	Email: string
	Address: string
	DormitoryId: number
	DormitoryName: string
	DormitoryAreaId: number
	DormitoryAreaName: string
	DormitoryRoomId: number
	DormitoryRoomName: string
	WarningLevel: string
	Note: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
	TotalRow: number
}

type TUpdateDormitoryWarning = {
	Id: number
	ModifiedOn: string
	DormitoryId: number
	DormitoryAreaId: number
	DormitoryRoomId: number
	WarningLevel: string
	Note: string
}
type TUpdateDormitoryWarningBody = {
	UserId: number
	DormitoryId: number
	DormitoryAreaId: number
	DormitoryRoomId: number
	WarningLevel: number
	Note: string
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}
