import { instance } from '~/api/instance'

const URl = 'api/StudyRouteTemplateDetail'

export const StudyRouteTemplateDetailApi = {
	getAllStudyRouteTemplateDetail(params) {
		return instance.get<IApiResultData<IStudyRouteTemplateDetail[]>>(URl, { params })
	},
	getStudyRouteTemplateDetailById(id) {
		return instance.get<IApiResultCreate<IStudyRouteTemplateDetail>>(URl + '/' + id)
	},
	createStudyRouteTemplateDetail(params) {
		return instance.post<IApiResultCreate<IStudyRouteTemplateDetail>>(URl, params)
	},
	updateStudyRouteTemplateDetail(params) {
		return instance.put<IApiResultCreate<IStudyRouteTemplateDetail>>(URl, params)
	},
	deleteStudyRouteTemplateDetail(id) {
		return instance.delete<IApiResultCreate<{ message: string }>>(URl + '/' + id)
	},
	changeIndenStudyRouteTemplateDetail(items){
		return instance.put<IApiResultCreate<{ message: string }>>(URl + '/change-index' ,items)
	}
	
}
