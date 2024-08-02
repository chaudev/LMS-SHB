import { instance } from '~/api/instance'

const urlSampleEvaluationForm = '/api/SampleEvaluationForm'
const urlSampleEvaluationGroup = '/api/SampleEvaluationGroup'

// ** api/SampleEvaluationForm
export const evaluationApi = {
	getAllForm(todoApi) {
		return instance.get<IApiResultData<TSampleEvaluationFormItem[]>>(urlSampleEvaluationForm, {
			params: todoApi
		})
	},
	getDetailForm(id) {
		return instance.get<IApiResultData<TSampleEvaluationFormItem>>(urlSampleEvaluationForm + `/${id}`)
	},
	addForm(data: TPostSampleEvaluationForm) {
		return instance.post(urlSampleEvaluationForm, data)
	},
	updateForm(data: TPutSampleEvaluationForm) {
		return instance.put(urlSampleEvaluationForm, data, {})
	},
	deleteForm(id) {
		return instance.delete(`${urlSampleEvaluationForm}/${id}`)
	}
}

// ** api/SampleEvaluationGroup
export const evaluationGroupApi = {
	getDetail(sampleEvaluationFormId) {
		return instance.get<IApiResultData<TSampleEvaluationGroup[]>>(
			urlSampleEvaluationGroup + '/by-sample-evaluation-form' + `/${sampleEvaluationFormId}`
		)
	},
	add(data: TPostSampleEvaluationGroup) {
		return instance.post(urlSampleEvaluationGroup, data)
	},
	update(data: TPutSampleEvaluationGroup) {
		return instance.put(urlSampleEvaluationGroup, data, {})
	},
	changeIndex(data: TChangeIndexSampleEvaluationGroup) {
		return instance.put(urlSampleEvaluationGroup + '/change-index', data, {})
	},
	delete(id) {
		return instance.delete(`${urlSampleEvaluationGroup}/${id}`)
	}
}
