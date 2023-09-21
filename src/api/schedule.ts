import { instance } from '~/api/instance'

const url = '/api/Schedule'
export const scheduleApi = {
	getAll(scheduleParams: any) {
		return instance.get<IApiResultData<ISchedule[]>>(url, {
			params: scheduleParams
		})
	},
	getStudyTime() {
		return instance.get<IApiResultData<any>>(`${url}/study-time-available`)
	},
	add(data) {
		return instance.post(url, data)
	},
	adds(data) {
		return instance.post(`${url}/items`, { items: data })
	},
	
	checkTime(data) {
		return instance.post(`${url}/validate`, data)
	},

	update(data) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	},
	cancelTutoring(id) {
		return instance.put(`${url}/tutoring-cancel/${id}`)
	},
	updateRateTeacher(data) {
		return instance.put(`${url}/rate-teacher`, data, {})
	}
}
