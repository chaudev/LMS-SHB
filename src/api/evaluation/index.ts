import { instance } from '~/api/instance'

//! Công việc bao gồm:

// CRUD phiếu đánh giá (SampleEvaluationForm)
// CRUD nhóm câu hỏi trong phiếu đánh giá (SampleEvaluationGroup)
// CRUD nhóm câu hỏi trong nhóm (SampleEvaluationQuestion)
// CRUD đáp án cho các câu hỏi loại trắc nghiệm (SampleEvaluationOption)
// CRUD đáp án cho các câu hỏi loại đánh giá (SampleEvaluationGroupOption)
// => chỗ câu hỏi thuộc type: đánh giá sẽ làm dạng bảng (giống bên dhyd)
// tạo phiếu trước SampleEvaluationForm -> Tạo nhóm câu hỏi (chọn loại nhóm câu hỏi) -> Tạo câu hỏi trong nhóm

//? SampleEvaluationQuestion cái này thì dạng nào cũng dùng

// nếu là dạng trắc nghiệm thì xài chung với SampleEvaluationOption
// nếu là dạng tự luận (Essay) thì chỉ cần cái SampleEvaluationQuestion thôi
// nếu là dạng bảng (Evaluation) thì xài cái SampleEvaluationGroupOption
// (chỉ tạo 1 danh sách đáp án chung xài SampleEvaluationGroupOption, còn lại là tạo các câu hỏi xài SampleEvaluationQuestion)

const urlSampleEvaluationForm = '/api/SampleEvaluationForm'
const urlSampleEvaluationGroup = '/api/SampleEvaluationGroup'
const urlSampleEvaluationQuestion = '/api/SampleEvaluationQuestion'
const urlSampleEvaluationOption = '/api/SampleEvaluationOption'
const urlSampleEvaluationGroupOption = '/api/SampleEvaluationGroupOption'

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

// ** api/SampleEvaluationQuestion
export const evaluationQuestionApi = {
	getDetail(sampleEvaluationGroupId) {
		return instance.get<IApiResultData<TSampleEvaluationQuestion[]>>(
			urlSampleEvaluationQuestion + '/by-sample-evaluation-group' + `/${sampleEvaluationGroupId}`
		)
	},
	add(data: TPostSampleEvaluationQuestion) {
		return instance.post(urlSampleEvaluationQuestion, data)
	},
	update(data: TPutSampleEvaluationQuestion) {
		return instance.put(urlSampleEvaluationQuestion, data, {})
	},
	changeIndex(data: TChangeIndexSampleEvaluationQquestion) {
		return instance.put(urlSampleEvaluationQuestion + '/change-index', data, {})
	},
	delete(id) {
		return instance.delete(`${urlSampleEvaluationQuestion}/${id}`)
	}
}

// ** /api/SampleEvaluationOption
export const evaluationOptionApi = {
	getDetail(sampleEvaluationQuestionId) {
		return instance.get<IApiResultData<TSampleEvaluationOption[]>>(
			urlSampleEvaluationOption + '/by-sample-evaluation-question' + `/${sampleEvaluationQuestionId}`
		)
	},
	add(data: TPostSampleEvaluationOption) {
		return instance.post(urlSampleEvaluationOption, data)
	},
	update(data: TPutSampleEvaluationOption) {
		return instance.put(urlSampleEvaluationOption, data, {})
	},
	changeIndex(data: TChangeIndexSampleEvaluationOption) {
		return instance.put(urlSampleEvaluationOption + '/change-index', data, {})
	},
	delete(id) {
		return instance.delete(`${urlSampleEvaluationOption}/${id}`)
	}
}

// ** api/SampleEvaluationGroupOption

// export const evaluationGroupOptionApi = {
// 	getDetail(sampleEvaluationQuestionId) {
// 		return instance.get<IApiResultData<TSampleEvaluationOption[]>>(
// 			urlSampleEvaluationGroupOption + '/by-sample-evaluation-question' + `/${sampleEvaluationQuestionId}`
// 		)
// 	},
// 	add(data: TPostSampleEvaluationOption) {
// 		return instance.post(urlSampleEvaluationGroupOption, data)
// 	},
// 	update(data: TPutSampleEvaluationOption) {
// 		return instance.put(urlSampleEvaluationGroupOption, data, {})
// 	},
// 	changeIndex(data: TChangeIndexSampleEvaluationOption) {
// 		return instance.put(urlSampleEvaluationGroupOption + '/change-index', data, {})
// 	},
// 	delete(id) {
// 		return instance.delete(`${urlSampleEvaluationGroupOption}/${id}`)
// 	}
// }
