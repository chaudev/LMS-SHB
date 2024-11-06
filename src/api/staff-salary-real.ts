import { instance } from '~/api/instance'
const url = '/api/StaffSalary'
export const staffSalaryRealApi = {
	keyGetAll: 'GET /api/StaffSalary',
	getAll(params: TGetStaffSalaryRealParams) {
		return instance.get<IApiResultData<TStaffSalaryReal[]>>(url, {
			params
		})
	},
	add(data: TPostStaffSalaryReal) {
		return instance.post(url, data)
	},
	update(data: TPutStaffSalaryReal) {
		return instance.put(url, data, {})
	},
	delete(id: number) {
		return instance.delete(`${url}/${id}`)
	},
	import(data) {
		let fData = new FormData()
		fData.append('File', data)
		return instance.post<IApiResultData<TStaffSalaryReal[]>>(`${url}/import`, fData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	},
	saveImport(data: { items: TStaffSalaryReal[] }) {
		return instance.post(`${url}/import-save`, data, {})
	},
	exportTemplateExcel() {
		return instance.get<IApiResultData<string>>(`${url}/template`, {})
	},
	exportExcel(params: TGetStaffSalaryRealParams) {
		return instance.get<IApiResultData<string>>(`${url}/excel`, { params })
	}
}
