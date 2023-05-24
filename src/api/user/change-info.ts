import { instance } from '../instance'

const URL = '/api/ChangeInfo'

export const changeInfoApi = {
	getAll(params) {
		return instance.get<IApiResultData<any>>(URL, { params })
	},
	getByID(ID) {
		return instance.get<IApiResultData<IUserResponse>>(`${URL}${ID}`)
	},
	add(data) {
		return instance.post(URL, data)
	},
	update(data: { Enable?: boolean } & any) {
		return instance.put(URL, data)
	},
	acceptUpdate(ID) {
		return instance.put(`${URL}/${ID}/Status/Approve`)
	},
	delete(data) {
		return instance.delete(URL + data)
	}
}
