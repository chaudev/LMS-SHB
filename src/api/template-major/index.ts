import { instance } from '~/api/instance'

const url = '/api/TemplateMajor'
export const templateMajorApi = {
	keyGetAll: 'GET /api/TemplateMajor',
	getAll(todoApi: TGetTemplateMajor) {
		return instance.get<IApiResultData<TTemplateMajor[]>>(url, {
			params: todoApi
		})
	},

	keyGetGuide: 'GET /api/TemplateMajor/guide',
	getGuide() {
		return instance.get<IApiResultData<TTemplateMajorGuide[]>>(`${url}/guide`, {})
	},

	keyGetById: 'GET /api/TemplateMajor/id',
	getById(id: number) {
		return instance.get<IApiResultData<TTemplateMajor>>(`${url}/${id}`)
	},

	keyGetFillData: 'GET /api/TemplateMajor/fill-data',
	getFillData(params: TGetTemplateMajorFillData) {
		return instance.get<IApiResultData<TTemplateMajor[]>>(`${url}/fill-data`, { params })
	},

	add(data: TPostTemplateMajor) {
		return instance.post(url, data, {})
	},

	update(data: TPutTemplateMajor) {
		return instance.put(url, data, {})
	},

	delete(id: number) {
		return instance.delete(`${url}/${id}`)
	}
}
