import { instance } from '~/api/instance'

const url = '/api/Partner'
export const partnerApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IPartner[]>>(url, {
			params: todoApi
		})
	},

	add(data: IPartner) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}