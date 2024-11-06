import { instance } from '~/api/instance'

const url = '/api/SampleTranscript'
const urlTranscriptDetail = '/api/SampleTranscriptDetail'

// api/SampleTranscrip
export const sampleTranscriptApi = {
	getAll(todoApi) {
		return instance.get<IApiResultData<TSampleTranscript[]>>(url, {
			params: todoApi
		})
	},
	add(data) {
		return instance.post(url, data)
	},
	update(data: any) {
		return instance.put(url, data, {})
	},
	delete(id) {
		return instance.delete(`${url}/${id}`)
	}
}

// api/SampleTranscriptDetail
export const sampleTranscriptDetailApi = {
	getById(id) {
		return instance.get<TSampleTranscriptDetail>(urlTranscriptDetail + `/${id}`)
	},
	getTranscriptColumns(sampleTranscriptId) {
		return instance.get<IApiResultCreate<TSampleTranscriptDetail[]>>(urlTranscriptDetail + `/by-sample-transcript/${sampleTranscriptId}`)
	},
	add(data) {
		return instance.post(urlTranscriptDetail, data)
	},
	update(data: TPutSampleTranscriptDetail) {
		return instance.put(urlTranscriptDetail, data, {})
	},
	changeIndex(data: TPutChangeIndex) {
		return instance.put(urlTranscriptDetail + '/change-index', data)
	},
	delete(id) {
		return instance.delete(`${urlTranscriptDetail}/${id}`)
	}
}
