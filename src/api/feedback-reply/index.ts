import { instance } from '~/api/instance'

const url = '/api/FeedbackReply'

export const feedbackReplyApi = {
	get(todoApi) {
		return instance.get<IApiResultData<TFeedbackReply[]>>(url, {
			params: todoApi
		})
	},
	add(data: TPostFeedbackReply) {
		return instance.post(url, data)
	},
	update(data: TPutFeedbackReply) {
		return instance.put(url, data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
