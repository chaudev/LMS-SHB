import { instance } from '~/api/instance'

const url = '/api/Feedback'

export const feedbackApi = {
	getAll(todoApi) {
		return instance.get<IApiResultData<TFeedbackItem[]>>(url, {
			params: todoApi
		})
	},
	getAllMine(todoApi) {
		return instance.get<IApiResultData<TFeedbackItem[]>>(url + '/me', {
			params: todoApi
		})
	},
	getDetail(id) {
		return instance.get<IApiResultData<TFeedbackDetail>>(url + `/${id}`)
	},
	add(data: TPostFeedback) {
		return instance.post(url, data)
	},
	update(data: TPutFeedback) {
		return instance.put(url, data, {})
	},
	rating(data: TPutRating) {
		return instance.put(url + '/rating-feedback', data, {})
	},
	doneFB(id) {
		return instance.put(`${url}/done/${id}`)
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
