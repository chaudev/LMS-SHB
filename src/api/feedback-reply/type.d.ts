type TPostFeedbackReply = {
	FeedbackId: number
	Content: string
}

type TPutFeedbackReply = {
	Content: string
	Id: number
}

type TFeedbackReply = {
	FeedbackId: number
	Content: string
	IsIncognito: boolean
	CreatedIdBy: number
	Avatar: string
	Id: number
	Enable: boolean
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
	IsOwner: boolean
}
