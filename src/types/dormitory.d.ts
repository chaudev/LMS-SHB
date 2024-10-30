interface IBaseFilter {
	PageIndex: number
	PageSize: number
	Search?: string
	TotalPage?: number
}

/** Danh sách ký túc xá
  Dormitory : public string Code { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public int? BranchId { get; set; }
  public double fee { get; set; } // phí theo tháng
 */

type TDormitoryList = IBaseApi<{
	Id: number
	Code: string
	Name: string
	Description: string
	Fee: number
}>

type TDormitoryListFilter = IBaseFilter

/** Danh sách khu
  DormitoryArea(Khu KTX) : public int? 
  DormitoryId { get; set; }
  public string Code { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
 */

type TDormitorySection = IBaseApi<{
	Id?: number;
	DormitoryId: number
	DormitoryName: string
	Code: string
	Name: string
	Description: string
}>

type TDormitorySectionFilter = IBaseFilter & { DormitoryId?: number }

/** Danh sách phòng
  DormitoryRoom(Phòng KTX):
  public int? DormitoryId { get; set; }
  public int? DormitoryAreaId { get; set; }
  public int? UserId { get; set; }
  public bool IsUse { get; set; }
  public string Code { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
*/

type TDormitoryRoom = IBaseApi<{
	Id?: number;
	DormitoryId: number
	DormitoryAreaId: number
	UserId: number
	IsUse: boolean
	Code: string
	Name: string
	Description: string
	DormitoryName: string
	DormitoryAreaName: string
	IsFull: boolean
	QuantityUse: number;
	Users: IUser[]
	CountUser: number
}>

type TDormitoryRoomFilter = IBaseFilter & {
  DormitoryId?: number;
  DormitoryAreaId?: number;
  UserId?: number;
  IsUse?: boolean
	IsFull?: boolean
}
