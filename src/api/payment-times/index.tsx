import { instance } from '~/api/instance'

const URl = 'api/PaymentTimes'

export const paymentTimesApi = {
	getAllPaymentTimes(params) {
		return instance.get<IApiResultData<IPaymentTimes[]>>(URl, { params })
	},
	getPaymentTimesById(id) {
		return instance.get<IApiResultDetail<IPaymentTimes>>(URl + '/' + id)
	},
	updatePaymentTimes(params) {
		return instance.put<IApiResultCreate<IPaymentTimes>>(URl, params)
	}
}
