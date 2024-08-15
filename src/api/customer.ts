import { instance } from '~/api/instance'

const url = '/api/Customer'
export const customerAdviseApi = {
	getAll(todoApi: object) {
		return instance.get<IApiResultData<ICustomerAdvise[]>>(url, {
			params: todoApi
		})
	},

	getWithID(ID: number) {
		return instance.get<IApiResultData<ICustomerAdvise>>(url + ID)
	},

	getHistoryChange(ID: number) {
		return instance.get<IApiResultData<TCustomerHistory[]>>(url + '/history-change-status/' + ID)
	},

	add(data: ICustomer) {
		return instance.post(url, data, {})
	},

	update(data: any) {
		return instance.put(url, data, {})
	},

	delete(id) {
		return instance.delete(`${url}/${id}`)
	},

	getNoteByCustomer(params) {
		return instance.get('/api/CustomerNote', { params: params })
	},

	addNote(data: any) {
		return instance.post('/api/CustomerNote', data, {})
	},

	deleteNote(id) {
		return instance.delete(`/api/CustomerNote/${id}`)
	},

	sendEmail(data: any) {
		return instance.post(`${url}/send-mail`, data, {})
	},

	checkExist(data) {
		return instance.get(`${url}/check-exist`, { params: data })
	},
	importCustomer(data, branchId) {
		let fData = new FormData()
		fData.append('File', data)
		fData.append('BranchId', branchId)
		return instance.post(`${url}/ImportCustomer`, fData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	},
	downloadTemplate(branchId: number) {
		return instance.get(`${url}/template/${branchId}`)
	},
	importLeads(){

	}
}
