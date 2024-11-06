type TFeedbackItem = {
	FeedbackGroupId: number
	FeedbackGroupName: string
	Title: string
	Content: string
	Status: string
	IsPriority: true
	StarRating: number
	IsIncognito: true
	CreatedIdBy: number
	UserCode: string
	BranchIds: string
	Avatar: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
}

type TPostFeedback = {
	FeedbackGroupId: number
	Title: string
	Content: string
	IsPriority?: boolean
	IsIncognito?: boolean
}

type TPutFeedback = {
	FeedbackGroupId?: number
	Title?: string
	Content?: string
	IsPriority?: true
	IsIncognito?: true
	Status?: number
	Id: number
}

type TPutRating = {
	Id: number
	StarRating: number
}

type TFeedbackDetail = {
	FeedbackGroupId: number
	FeedbackGroupName: string
	Title: string
	Content: string
	Status: string
	IsPriority: true
	StarRating: number
	IsIncognito: true
	CreatedIdBy: number
	UserCode: string
	BranchIds: string
	Avatar: string
	Id: number
	CreatedOn: string
	CreatedBy: string
	ModifiedOn: string
	ModifiedBy: string
	RoomImages: string[]
}
