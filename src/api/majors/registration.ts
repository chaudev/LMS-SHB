import { instance } from '~/api/instance'

const URl = 'api/MajorsRegistration'

export const majorsRegistrationApi = {
	getAllMajorsRegistration(params) {
		return instance.get<IApiResultData<IMajorsRegistrationAvailble[]>>(URl, { params })
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
	},

	getAllMajorsRegistrationAvailble() {
		return instance.get<IApiResultData<IMajorsRegistrationAvailble[]>>(URl + '/student-available')
	}
}
