import { instance } from '~/api/instance'

const url = '/api/Majors'
export const majorsApi = {
	keyGetAll: 'GET /api/Majors',
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IMajors[]>>(url, {
			params: todoApi
		})
	},

	add(data: IMajors) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}