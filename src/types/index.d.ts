type IApiResultCertificate<T = any> = {
	message: string
	data: T
}
type IApiResult<T = any> = {
	createAcc: T
	message: string
	totalRow: number
	TotalRow: number
}

type IApiResultData<T = any> = {
	data: T
	message: string
	totalRow: number
	listLevel: Array
	isDone: boolean
	rateCompleted?: nummber
}

type IApiResultAcc<T = any> = {
	acc: T
	message: string
	totalRow: number
}

type IBaseApi<T> = {
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
} & T

type IApiResultDetail<T = any> = {
	data: T
}
type IApiResultCreate<T = any> = {
	data: T
	message: string
}
type IApiResultPagination<T = any> = {
	Success: boolean
	Data: T
	ResultCode: number
	ResultMessage: string
	NoContent: boolean
	TotalRow: number
}
