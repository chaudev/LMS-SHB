import { instance } from '~/api/instance'

const url = '/api/ProfileStatus'

export const profileStatusApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IProfileStatus[]>>(url, {
			params: todoApi
		})
	},

	add(data: IProfileStatus) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}