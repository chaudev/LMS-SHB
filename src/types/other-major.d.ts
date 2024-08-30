type TGetOtherMajor = {
	pageSize: number
	pageIndex: number
	search?: string
}

type TOtherMajor = {
	Name: string
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostOtherMajor = {
	Name: string
}

type TPutOtherMajor = {
	Id: number
	Name: string
}
