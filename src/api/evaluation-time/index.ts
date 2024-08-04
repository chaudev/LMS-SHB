import { instance } from '~/api/instance'
const url = '/api/EvaluationTime'

// ** /api/EvaluationTime'
export const evaluationTimeApi = {
	getAll(todoApi) {
		return instance.get<IApiResultData<TEvaluationTime[]>>(url, {
			params: todoApi
		})
	},
	getDetail(id) {
		return instance.get<IApiResultData<TEvaluationTime>>(url + `/${id}`)
	},
	add(data: TPostEvaluationTime) {
		return instance.post(url, data)
	},
	update(data: TPutEvaluationTime) {
		return instance.put(url, data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
