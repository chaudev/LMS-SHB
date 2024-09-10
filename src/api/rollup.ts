import { instance } from '~/api/instance'

const url = '/api/RollUp'

export const rollUpApi = {
	// Lấy tất cả data
	keyGetAll: 'GET /api/RollUp',
	getAll(params) {
		return instance.get<IApiResultData<IRollUp[]>>(url, {
			params
		})
	},

	// thêm data
	add(data) {
		return instance.post(`${url}/InsertOrUpdate`, data)
	},
	adds(data) {
		console.log("data: ", data.data);
		return instance.put(`${url}/items`, { ...data })
	},
	insertOrUpdateMultiple(data) {
		return instance.post(`${url}/insert-or-update-multiple`, { ...data })
	},

	// xóa data
	delete(ID) {
		return instance.delete(`${url}/${ID}`)
	},

	getRollUpStudent(params) {
		return instance.get<IApiResultData<IRollUpStudent[]>>(`${url}/roll-up-student`, {
			params
		})
	}
}
