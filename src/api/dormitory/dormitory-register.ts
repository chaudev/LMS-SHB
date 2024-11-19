import { instance } from '../instance'

const url = '/api/DormitoryRegistration'

export const dormitoryRegisterApi = {
	// Lấy tất cả data
	keyGetAll: `GET ${url}`,
	getAll(params: TDormitoryRegisterParams) {
		return instance.get<IApiResultData<TDormitoryItem[]>>(url, {
			params
		})
	},

	keyGetById: `GET-BY-ID ${url}/detail`,
	getById(id: number) {
		return instance.get<IApiResultData<TDormitoryItem>>(`${url}/${id}`)
	},

	// Thêm mới data
	keyCreate: `POST ${url}`,
	create(data: TDormitoryPOSTAndPUT) {
		return instance.post(url, data)
	},

	// update mới data
	keyUpdate: `PUT ${url}`,
	update(data: TDormitoryPOSTAndPUT) {
		return instance.put(url, data)
	},

	keyDelete: `DELETE ${url}/detail`,
	delete(id: number) {
		return instance.delete<IApiResultData>(`${url}/${id}`)
	},

	// chọn phòng cho học viên
	keyChoosenRoom: `POST ${url}/ `,
	chooseRoom(data: TDormitoryChoosenRoom) {
		return instance.post(`${url}/ChooseRoom`, data)
	},

	keyChangeDormitoryRoom: `POST ${url}`,
	changeDormitoryRoom(data: TDormitoryChoosenRoom) {
		return instance.post(`${url}/ChangeDormitoryRoom`, data)
	},

	keyExportDormitory: `POST ${url}/id`,
	exportDormitory(data: { Id: number; DateChange: string }) {
		return instance.post(`${url}/ExportDormitory`, data)
	},

	keyGetHitory: `GET ${url}/id`,
	getRegisterHistory(params: { domitoryRegistrationId: number }) {
		return instance.get<IApiResultData<TDormitoryRegisterHistory[]>>(`${url}/History`, { params })
	},
	getDormitoryRegistrationAvailableStudent: () =>
		instance.get<IApiResultDataDormitoryRegistrationAvailableStudent<TDormitoryRegistrationAvailableStudent[]>>(`${url}/Available-Student`)
}
