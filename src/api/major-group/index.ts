import { instance } from '~/api/instance'

const url = '/api/MajorGroup'
export const majorGroupApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<any[]>>(url, {
			params: todoApi
		})
	},

	add(data) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
