import { instance } from '~/api/instance'

const url = '/api/Process'

export const processApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IProcess[]>>(url, {
			params: todoApi
		})
	},

	add(data: IProcess) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}