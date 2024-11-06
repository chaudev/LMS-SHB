import { instance } from '~/api/instance'

const url = '/api/OtherMajor'
export const otherMajorApi = {
	keyGetAll: 'GET /api/OtherMajor',
	getAll(todoApi: TGetOtherMajor) {
		return instance.get<IApiResultData<TOtherMajor[]>>(url, {
			params: todoApi
		})
	},

	keyGetDropdown: 'GET /api/OtherMajor/dropdown',
	getDropdown() {
		return instance.get<IApiResultData<TOtherMajor[]>>(`${url}/dropdown`, {})
	},

	add(data: TPostOtherMajor) {
		return instance.post(url, data, {})
	},

	update(data: TPutOtherMajor) {
		return instance.put(url, data, {})
	},

	delete(id: number) {
		return instance.delete(`${url}/${id}`)
	}
}
