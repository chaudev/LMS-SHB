type IUser = {
	Address?: string
	AreaName?: string
	Avatar: string
	DOB?: string
	Email: string
	FullName?: string
	Gender?: string | number
	Mobile?: string
	RoleId: string | number
	role?: string
	unique_name: string
	Enable?: boolean
	CreatedOn?: string
	CreatedBy?: string
	ModifiedOn?: string
	ModifiedBy?: string

	BranchIds?: any

	UserCode: string
	UserInformationId: string | number
}

type IUserInputGetall = {
	sort?: any
	sortType?: boolean
	fullName?: string
	userCode?: string
	roleIds?: string
	genders?: string
	pageSize?: number
	pageIndex?: number
}

type IUserResponse = IBaseApi<{
	UserInformationId: number
	FullName: string
	UserName: string
	UserCode: string
	HighSchool: string
	BirthPlace: string
	NativeLand: string
	ContractSigningDate: string
	ContractNumber: string
	EnrollmentDay: string
	DOB: string
	Gender: number
	Mobile: string
	Email: string
	Address: string
	AreaName: string
	StatusId: number
	RoleId: number
	Extension?: string
	RoleName: string
	Avatar: string
	AreaId: number
	DistrictId: number
	WardId: number
	BranchIds: string
	LearningStatus: number
	LearningStatusName: string
	SourceId: number
	LearningNeedId: number
	OfficeId: number
	ForeignLanguageId: number
	PartnerId: number
	ProcessId: number
	VisaStatusId: number
	ProfileStatusId: number
	SaleId: number
	PurposeId: number
	parentInfo?: {
		UserInformationId: number
		FullName: string
		UserName: string
		UserCode: string
		DOB: string
		Avatar: any
		Mobile: string
		Email: string
		ParentType: number
	}
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}>

type IUserInformation = IBaseApi<{
	UserInformationId: number
	UserAccountID: number
	FullName: string
	FirstName: string
	LastName: string
	FullNameUnicode: string
	FullNameNonUnicode: string
	DOB: string
	Gender: number
	Mobile: number
	Extension: number
	Email: string
	Address: string
	BranchID: number
	StatusID: number
	RoleID: number
	RoleName: string
	Avatar: string
	SourceInformationID: number
	AreaID: number
	AreaName: string
	DistrictID: number
	DistrictName: string
	WardID: number
	WardName: string
	HouseNumber: number
	CMND: number
	CMNDDate: string
	CMNDRegister: string
	Jobdate: string
	JobID: number
	AcademicPurposesID: number
	PlacementTestID: number
	ParentsOf: string
	UserCode: string
	Ratings: string
	Enable: boolean
	CreatedOn: string
	CreatedBy: number
	ModifiedOn: string
	ModifiedBy: number
	SourceId: number
	LearningNeedId: number
	SaleId: number
	PurposeId: number
	SourceName: string
	LearningNeedName: string
	PurposeName: string
	SaleName: string
	Extension: string
	UserCode: string
}>
interface IUserProfileTemplateItem {
	Id: number
	Index: number
	ProfileTemplateName: string
	ProfileTemplateId: number
	Type: number
	UserId: number
	Value: string
}
interface IUpdateUserProfileTemplate {
	UserId: number
	ProfileTemplateId: number
	Value: string
}

interface IStatisticOverviewStudent {
	Item: {
		StatusName: string
		Amount: number
	}[]
	Type: number
	TypeName: string
}
