import { instance } from '~/api/instance'

const url = '/api/Gift'
export const giftApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IGift[]>>(url, {
			params: todoApi
		})
	},

	add(data: IGift) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}