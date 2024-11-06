type TFeedbackPermission = {
	Role: string
	RoleName: string
	FeedbackGroupIds: string
	FeedbackGroupNames: string[]
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostFeedbackPermission = {
	RoleId: number
	FeedbackGroupIds: string
}

type TPutFeedbackPermission = {
	FeedbackGroupIds: string
	Id: number
}
