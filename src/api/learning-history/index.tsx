import { instance } from '~/api/instance'

const URl = 'api/LearningHistory'

export const learningHistoryApi = {
	getAllLearningHistory(params) {
		return instance.get<IApiResultData<ILearningHistory[]>>(URl, { params })
	},
	getLearningHistoryById(id) {
		return instance.get<IApiResultDetail<ILearningHistory>>(URl + '/' + id)
	}
	// createPaymentType(params) {
	// 	return instance.post<IApiResultCreate<IPaymentType>>(URl, params)
	// },
	// updatePaymentType(params) {
	// 	return instance.put<IApiResultCreate<IPaymentType>>(URl, params)
	// },
	// deletePaymentType(id) {
	// 	return instance.delete<IApiResultCreate<{ message: string }>>(URl + '/' + id)
	// },
	// getAllPaymentTypeDetail(id) {
	// 	return instance.get<IApiResultData<IPaymentTypeDetail[]>>(URl + '/detail/' + id)
	// },
	// updatePaymentTypeDetail(params) {
	// 	return instance.put<IApiResultCreate<IPaymentTypeDetail>>(URl + '/detail/', params)
	// }
}
