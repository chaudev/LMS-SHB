import { instance } from '~/api/instance'

const url = '/api/SaveGradesInClass'

// api/ClassTranscript
export const saveGradesInClassApi = {
	get(params) {
		return instance.get<IApiResultData<TSaveGradesInClass[]>>(url, {
			params: params
		})
	},
	add(data: TPostSaveGradesInClass[]) {
		return instance.post(url, data)
	}
}
