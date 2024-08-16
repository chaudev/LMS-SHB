type TGeneralNotification = IBaseApi<{
	Title: string
	Content: string
	UserIds: string // '1440'
	IsSendMail: boolean
	Achievements: string[]
}>

type TCreateGeneralNotification = {
	Title: string
	Content: string
	UserIds: string
	IsSendMail: boolean
	Achievements: string // string[]
}

type TGeneralNotificationReceiver = {
	UserInformationId: number
	FullName: string 
	UserCode: string
}
