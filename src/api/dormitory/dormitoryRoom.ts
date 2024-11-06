import { instance } from '../instance'

const url = '/api/DormitoryRoom/'

export const dormitoryRoomApi = {
	// Lấy tất cả data
  keyGetAll: `GET ${url}`,
	getAll(params: TDormitoryRoomFilter) {
		return instance.get<IApiResultData<TDormitoryRoom[]>>(url, {
			params
		})
	},

	// Thêm mới data
  keyCreate: `POST ${url}`,
	create(data: TDormitoryRoom) {
		return instance.post(url, data)
	},

	// update mới data
  keyUpdate: `PUT ${url}`,
	update(data: TDormitoryRoom) {
		return instance.put(url, data)
	},


  keyGetById: `GET-BY-ID ${url}/detail`,
	getById(id: number) {
		return instance.get<IApiResultData<TDormitoryRoom>>(`${url}${id}`)
	},

  keyDelete: `DELETE ${url}/detail`,
  delete(id: number) {
    return instance.delete<IApiResultData>(`${url}${id}`)
  }
}