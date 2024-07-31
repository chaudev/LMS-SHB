import { instance } from '~/api/instance'

const url = '/api/FeedbackGroup'

export const feedbackGroupApi = {
	getAll(todoApi) {
		return instance.get<IApiResultData<TFeedbackGroup[]>>(url, {
			params: todoApi
		})
	},
	add(data) {
		return instance.post(url, data)
	},
	update(data: any) {
		return instance.put(url, data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
