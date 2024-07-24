import { instance } from '~/api/instance'

const url = '/api/ClassTranscript'
const urlClassTranscriptDetail = '/api/ClassTranscriptDetail'

// api/ClassTranscript
export const classTranscriptApi = {
	getAll(params) {
		return instance.get<IApiResultData<TClassTranscript[]>>(url, {
			params: params
		})
	},
	add(data: TPostClassTranscript) {
		return instance.post(url, data)
	},
	update(data: TPutClassTranscript) {
		return instance.put(url, data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}

// api/ClassTranscriptDetail
export const classTranscriptDetailApi = {
	getById(id) {
		return instance.get<TClassTranscriptDetail>(urlClassTranscriptDetail + `/${id}`)
	},
	getTranscriptColumns(classTranscriptId) {
		return instance.get<IApiResultCreate<TClassTranscriptDetail[]>>(urlClassTranscriptDetail + `/by-class-transcript/${classTranscriptId}`)
	},
	add(data: TPostClassTranscript) {
		return instance.post(urlClassTranscriptDetail, data)
	},
	update(data: TPutClassTranscriptDetail) {
		return instance.put(urlClassTranscriptDetail, data, {})
	},
	changeIndex(data: TPutChangeIndex) {
		return instance.put(urlClassTranscriptDetail + '/change-index', data)
	},
	delete(id) {
		return instance.delete(`${urlClassTranscriptDetail}/${id}`)
	}
}
