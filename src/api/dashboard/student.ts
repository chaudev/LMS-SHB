import { instance } from '../instance'

const url = '/api/StatisticalStudent/'
export const statisticalStudentApi = {
	GetByOffice() {
		return instance.get<IApiResultData<any>>(url + 'GetByOffice', {})
	},
	GetByClass() {
		return instance.get<IApiResultData<any>>(url + 'GetByClass', {})
	},
	GetByLevel() {
		return instance.get<IApiResultData<any>>(url + 'GetByLevel', {})
	},
	GetByLearningStatus() {
		return instance.get<IApiResultData<any>>(url + 'GetByLearningStatus', {})
	},
	GetByAttenance(params) {
		return instance.get<IApiResultData<any>>(url + 'GetByAttenance', { params })
	},
	GetStatisticalStudentAmountByAge() {
		return instance.get<IApiResultData<any>>(url + 'GetStatisticalStudentAmountByLevel', {})
	}
}
