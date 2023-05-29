import { instance } from '~/api/instance'

const url = '/api/StudentPointRecord'
export const studentPointRecordApi = {
	getAll(todoApi?: object) {
		return instance.get<IApiResultData<IBranch[]>>(url, {
			params: todoApi
		})
	},
	add(data) {
		return instance.post(url, data)
	},
	exportFile(studentPointRecordId) {
		return instance.put(url + '/' + studentPointRecordId)
	},
	update(data: any) {
		return instance.put(url, data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}
