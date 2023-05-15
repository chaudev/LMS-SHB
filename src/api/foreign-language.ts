import { instance } from '~/api/instance'

const url = '/api/ForeignLanguage'

export const foreignLanguageApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IForeignLanguage[]>>(url, {
			params: todoApi
		})
	},

	add(data: IForeignLanguage) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}