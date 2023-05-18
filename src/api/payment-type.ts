import { instance } from '~/api/instance'

const url = '/api/PaymentType'

export const paymentTypeApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<IPaymentType[]>>(url, {
			params: todoApi
		})
	},

	add(data: IPaymentType) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	},
	getDetail(id) {
		return instance.get(`${url}/detail/${id}`)
	},
	updateDetail(data) {
		return instance.put(`${url}/detail`, data, {})
	}
}