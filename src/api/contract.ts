import { instance } from './instance'

const url = '/api/Contract/'
export const contractApi = {
	// Lấy tất cả data
	getAll(params) {
		return instance.get<IApiResultData<IContract[]>>(url, {
			params
		})
	},
	getByStudentID(studentID) {
		return instance.get<IApiResultData<IContract[]>>(`${url}template/${studentID}`)
	},
	getStudentContract(params) {
		return instance.get<IApiResultData<IContract[]>>(`${url}Me`, { params })
	},

	// Cập nhật data
	update(data) {
		return instance.put(url, data)
	},
	addContract(data: TPostContract) {
		return instance.post(url, data)
	},
	delete(id) {
		return instance.delete(url + `/${id}`)
	}
}
