import { instance } from '../instance'

const url = '/api/Dormitory/'

export const dormitoryApi = {
	// Lấy tất cả data
  keyGetAll: `GET ${url}`,
	getAll(params: TDormitoryListFilter) {
		return instance.get<IApiResultData<TDormitoryList[]>>(url, {
			params
		})
	},

	// Thêm mới data
  keyCreate: `POST ${url}`,
	create(data: TDormitoryList) {
		return instance.post(url, data)
	},

	// update mới data
  keyUpdate: `PUT ${url}`,
	update(data: TDormitoryList) {
		return instance.put(url, data)
	},


  keyGetById: `GET-BY-ID ${url}/detail`,
	getById(id: number) {
		return instance.get<IApiResultData<TDormitoryList>>(`${url}${id}`)
	},

  keyDelete: `DELETE ${url}/detail`,
  delete(id: number) {
    return instance.delete<IApiResultData>(`${url}${id}`)
  }
}