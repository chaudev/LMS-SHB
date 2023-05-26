import { instance } from '../instance'

const url = '/api/StatisticTeachingSchedule/'
export const statisticalTeacherApi = {
	getAll() {
		return instance.get<IApiResultData<any>>(url + 'get-all-teaching-schedule ', {})
	},
	getDetail(params) {
		return instance.get<IApiResultData<any>>(url + 'get-teach-schedule-detail', { params })
	}
}
