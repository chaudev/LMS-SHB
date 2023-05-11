import { instance } from '~/api/instance'

const url = '/api/VisaStatus'

export const visaStatusApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IVisaStatus[]>>(url, {
			params: todoApi
		})
	},

	add(data: IVisaStatus) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}