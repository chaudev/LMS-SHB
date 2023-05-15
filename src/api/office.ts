import { instance } from '~/api/instance'

const url = '/api/Office'

export const officeApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IOffice[]>>(url, {
			params: todoApi
		})
	},

	add(data: IOffice) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}