type TDormitoryRegisterParams = {
	DormitoryId?: number
	DormitoryAreaId?: number
	DormitoryRoomId?: number
	StudentId?: number
	Status?: 1 | 2 | 3 | 4
	Ids?: string
	PageSize: number
	PageIndex: number
	Search?: string
	TotalPage?: number
}

type TDormitoryItem = IBaseApi<{
	Id: number
	DormitoryId: number // 1
	DormitoryName: string // 'KTX Đỗ xuân hợp'
	DormitoryAreaId: number // 2
	DormitoryAreaName: string // 'KTX-B01'
	DormitoryRoomId: number // 3
	DormitoryRoomName: string //'Phòng B-101'
	StudentId: number //  1457
	StudentName: string //'Híu Nguỹn'
	StudentCode: string //'HV-0048'
	StudentAvatar: string
	StartDate: string // '2024-10-30T10:27:37.262'
	EndDate: string //'2025-05-30T10:27:37.262'
	Price: number // 4000000
	Note: string //'DK 7 tháng'
	Status: 1 | 2 | 3 | 4 // 2
	StatusName: string //'Trong khu'
}>

// ** Chọn phòng cho học viên
type TDormitoryChoosenRoom = {
	Id: number //0
	ModifiedOn: string // '2024-10-28T06:02:52.110Z'
	DormitoryAreaId: number //0
	DormitoryRoomId: number //0
	Paid?: number //0
	PaymentMethodId?: number //0
	DateChange?: string
}

type TDormitoryPOSTAndPUT = {
	Id?: number // 0
	DormitoryId: number // 0
	StudentId: number // 0
	StartDate: string //'2024-10-28T06:05:57.574Z'
	EndDate: string //'2024-10-28T06:05:57.574Z'
	Price: number // 0
	Note: string // 'string'
}

// type TDormitoryPUT = {
// 	ModifiedOn: string // '2024-10-28T06:06:31.675Z'
// 	DormitoryId: number // 0
// 	StudentId: number // 0
// 	StartDate: string // '2024-10-28T06:06:31.675Z'
// 	EndDate: string // '2024-10-28T06:06:31.675Z'
// 	Price: number // 0
// 	Note: string //'string'
// }

// ** Lịch sử đăng ký
type TDormitoryRegisterHistory = {
	CreatedBy: string // 'Admin '
	CreatedOn: string // '2024-10-29T10:48:34.7760048'
	DateChange: string // '2024-10-29T10:48:34.518'
	Description: string // 'Xuất khu ký túc xá'
	DormitoryAreaId: number // 1
	DormitoryAreaName: string // 'Khu A-01 '
	DormitoryId: number // 9
	DormitoryName: string // null
	DormitoryRegistrationId: number // 9
	DormitoryRoomId: number // 3
	DormitoryRoomName: string // 'Phòng B-101'
	Id: number // 16 
	ModifiedBy:string //  'Admin '
	ModifiedOn: string // '2024-10-29T10:48:34.7760076'
	StudentAvatar: string
	StudentCode: string // '[MonaDevTest-00001]'
	StudentName: string // 'MonaDevTest'
	UserId: number // F1458
}
