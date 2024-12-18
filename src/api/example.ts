import { instance } from './instance'

const url = '/api/Exam/'

export const exampleApi = {
	// Lấy tất cả data
	getAll(params) {
		return instance.get<IApiResultData<any[]>>(url, {
			params
		})
	},
	// Lấy theo ID
	getByID(ID) {
		return instance.get<IApiResultData<any>>(`${url}${ID}`)
	},
	// Thêm mới data
	add(data) {
		return instance.post(url, data)
	},
	// Cập nhật data
	update(data) {
		return instance.put(url, data)
	},
	// Xóa data
	delete(data) {
		return instance.put(url, data)
	}
}
