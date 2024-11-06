import { instance } from '~/api/instance'
const url = '/api/UserEvaluationForm'

// ** /api/UserEvaluationForm'
export const userEvaluationFormApi = {
	getAll(todoApi: TParamsGetUserEvaluationForm) {
		return instance.get<IApiResultData<TUserEvaluationForm[]>>(url, {
			params: todoApi
		})
	},
	getDetail(id) {
		return instance.get<IApiResultData<TUserEvaluationDetail>>(url + `/detail/${id}`)
	},
	getMe(todoApi: TParamsGetMe) {
		return instance.get<IApiResultData<TUserEvaluationFormMe[]>>(url + `/me`, {
			params: todoApi
		})
	},
	getListAvailableUser(evaluationTimeId) {
		return instance.get<IApiResultData<TUserEvaluationFormList[]>>(url + '/list-user' + `/${evaluationTimeId}`)
	},
	add(data: TPostUserEvaluationForm) {
		return instance.post(url, data)
	},
	submit(data: TSubmitUserEvaluationForm) {
		return instance.put(url + '/submit', data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
