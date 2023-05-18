import { instance } from '~/api/instance'

const URl = 'api/PaymentType'

export const paymentTypeApi = {
	getAllPaymentType(params) {
		return instance.get<IApiResultData<IPaymentType[]>>(URl, { params })
	},
	getPaymentTypeById(id) {
		return instance.get<IApiResultDetail<IPaymentType>>(URl + '/' + id)
	},
	createPaymentType(params) {
		return instance.post<IApiResultCreate<IPaymentType>>(URl, params)
	},
	updatePaymentType(params) {
		return instance.put<IApiResultCreate<IPaymentType>>(URl, params)
	},
	deletePaymentType(id) {
		return instance.delete<IApiResultCreate<{ message: string }>>(URl + '/' + id)
	},
	getAllPaymentTypeDetail(id) {
		return instance.get<IApiResultData<IPaymentTypeDetail[]>>(URl + '/detail/' + id)
	},
	updatePaymentTypeDetail(params) {
		return instance.put<IApiResultCreate<IPaymentTypeDetail>>(URl + '/detail/', params)
	}
}
