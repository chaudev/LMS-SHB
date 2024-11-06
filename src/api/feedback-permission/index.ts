import { instance } from '~/api/instance'

const url = '/api/FeedbackPermission'

export const feedbackPermissionApi = {
	getAll(todoApi) {
		return instance.get<IApiResultData<TFeedbackPermission[]>>(url, {
			params: todoApi
		})
	},
	add(data: TPostFeedbackPermission) {
		return instance.post(url, data)
	},
	update(data: TPutFeedbackPermission) {
		return instance.put(url, data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
