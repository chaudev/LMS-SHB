type TGetStaffSalaryRealParams = {
	pageSize: number
	pageIndex: number
	roleIds?: string
	search?: string
}

type TStaffSalaryReal = {
	UserId: number
	StaffName: string
	StaffCode: string
	RoleId: number
	RoleName: string
	BankName: string
	BankNumber: string
	SalaryContract: number
	BaseSalary: number
	PerformanceSalary: number
	PhoneMoney: number
	GasMoney: number
	HousingAllowance: number
	LunchMoney: number
	ExtraAllowance: number
	ManagementAllowance: number
	SpecialAllowances: number
	NumberDaySalary: number
	ActualWorkDay: number
	DayOffAllow: number
	WorkDaysHour: number
	MoreHourOrdinaryDay: number
	MoreHourDayOff: number
	MoreHourHoliday: number
	WorkDaySalary: number
	TeachingHourSalary: number
	TotalOvertimePay: number
	Commission: number
	NewYearBonus: number
	UniformSupport: number
	AccommodationAllowance: number
	ProjectContract: number
	Other: number
	MinusLateOrLeavingEarly: number
	SI_HI_UI: number
	PIT: number
	OtherDeduction: number
	AdvancePayment: number
	ActualReceipt: number
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostStaffSalaryReal = {
	UserId: number
	BankName: string
	BankNumber: string
	SalaryContract: number
	BaseSalary: number
	PerformanceSalary: number
	PhoneMoney: number
	GasMoney: number
	HousingAllowance: number
	LunchMoney: number
	ExtraAllowance: number
	ManagementAllowance: number
	SpecialAllowances: number
	NumberDaySalary: number
	ActualWorkDay: number
	DayOffAllow: number
	WorkDaysHour: number
	MoreHourOrdinaryDay: number
	MoreHourDayOff: number
	MoreHourHoliday: number
	WorkDaySalary: number
	TeachingHourSalary: number
	TotalOvertimePay: number
	Commission: number
	NewYearBonus: number
	UniformSupport: number
	AccommodationAllowance: number
	ProjectContract: number
	Other: number
	MinusLateOrLeavingEarly: number
	SI_HI_UI: number
	PIT: number
	OtherDeduction: number
	AdvancePayment: number
	ActualReceipt: number
}

type TPutStaffSalaryReal = TPostStaffSalaryReal & {
	Id: number
}
