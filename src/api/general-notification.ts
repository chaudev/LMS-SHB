import { instance } from '~/api/instance'

const url = '/api/GeneralNotification'
export const generalNotificationApi = {
	getAll(Params: any) {
		return instance.get<IApiResultData<TGeneralNotification[]>>(url, {
			params: Params
		})
	},

	getReceiverById(id: number) {
		return instance.get<IApiResultData<TGeneralNotificationReceiver[]>>(`${url}/receiver/${id}`)
	},

	create(data: TCreateGeneralNotification) {
		return instance.post(url, data)
	}
}
