import { instance } from '~/api/instance'

const URl = 'api/StudyRouteTemplate'

export const studyRouteTemplateApi = {
	getAllStudyRoute(params) {
		return instance.get<IApiResultData<IStudyRoute[]>>(URl, { params })
	},
	getStudyRouteTemplateById(id) {
		return instance.get<IApiResultDetail<IStudyRoute>>(URl + '/' + id)
	},
	createStudyRouteTemplate(params) {
		return instance.post<IApiResultCreate<IStudyRoute>>(URl, params)
	},
	updateStudyRouteTemplate(params) {
		return instance.put<IApiResultCreate<IStudyRoute>>(URl, params)
	},
	deleteStudyRouteTemplate(id) {
		return instance.delete<IApiResultCreate<{ message: string }>>(URl + '/' + id)
	}
}
