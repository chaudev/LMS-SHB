import { instance } from '~/api/instance'

const url = '/api/ProfileTemplate'
export const profileTemplateApi = {
	// Lấy tất cả data
	getAll() {
		return instance.get<IApiResultData<IProfileTemplate[]>>(url, {})
	},

	changeIndexProfileTemplate(params) {
		return instance.put<IApiResultData<IProfileTemplate[]>>(url + '/change-index', params)
	},
	deleteById(Id) {
		return instance.delete<IApiResultData<IProfileTemplate[]>>(url + '/' + Id)
	},

	createProfileTemplate(params) {
		return instance.post<IApiResultData<IProfileTemplate>>(url, params)
	},
	updateProfileTemplate(params) {
		return instance.put<IApiResultData<IProfileTemplate>>(url, params)
	}
}