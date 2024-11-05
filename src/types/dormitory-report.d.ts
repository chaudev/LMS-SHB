type TDormitoryReportItem = {
	DormitoryId: number
	DormitoryCode: string
	Name: string
	TotalArea: number
	TotalRoom: number
	TotalRoomQuantity: number
	RoomQuantityInUse: number
	RoomQuantityAvailabe: number
}

type TStudentInOutDormitory = {
	Status: string
	TotalStudentQuantity: number
}

type TQueryStudentInOutDormitory = {
	Search?: string | number
	DormitoryId?: number
	DormitoryAreaId?: number
	DormitoryRoomId?: number
	FromDate?: string
	ToDate?: string
}

type TQueryDormitoryWarning = TQueryStudentInOutDormitory & { WarningLevel?: 'Nhe' | 'Vua' | 'Nghiemtrong' }

type TDormitoryWarning = {
	TotalWarning: number
	TotalWarningBasaeOnLevels: {
		WarningLevel: string
		TotalWarningOfLevel: number
	}[]
}
