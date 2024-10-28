import { instance } from '../instance'

const url = '/api/DormitoryArea/'

export const dormitoryAreaApi = {
	// Lấy tất cả data
  keyGetAll: `GET ${url}`,
	getAll(params: TDormitorySectionFilter) {
		return instance.get<IApiResultData<TDormitorySection[]>>(url, {
			params
		})
	},

	// Thêm mới data
  keyCreate: `POST ${url}`,
	create(data: TDormitorySection) {
		return instance.post(url, data)
	},

	// update mới data
  keyUpdate: `PUT ${url}`,
	update(data: TDormitorySection) {
		return instance.put(url, data)
	},


  keyGetById: `GET-BY-ID ${url}/detail`,
	getById(id: number) {
		return instance.get<IApiResultData<TDormitorySection>>(`${url}${id}`)
	},

  keyDelete: `DELETE ${url}/detail`,
  delete(id: number) {
    return instance.delete<IApiResultData>(`${url}${id}`)
  }
}