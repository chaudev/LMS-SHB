import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EVALUATION_TYPES } from '~/common/utils/constants'

const initialState = {
	EvaluationGroupDetails: [] as TGroupDetail[]
}

const evaluationStateReducer = createSlice({
	name: 'evaluationState',
	initialState,
	reducers: {
		setSubmitData: (state, { payload }: PayloadAction<TGroupDetail[]>) => {
			state.EvaluationGroupDetails = payload
		},
		// logic đơn giản là chui từ từ vào đúng dữ liệu cần chỉnh sửa thôi
		saveEssayAnswer: (state, { payload }: PayloadAction<TQuestionDetail>) => {
			state.EvaluationGroupDetails = state.EvaluationGroupDetails?.map((item) =>
				item.Type == EVALUATION_TYPES.essay
					? {
							...item,
							EvaluationQuestionDetails: item?.EvaluationQuestionDetails?.map((item) =>
								item.Id == payload.Id
									? {
											...payload
									  }
									: item
							)
					  }
					: item
			)
		},
		saveMultipleAnswer: (state, { payload }: PayloadAction<TOptionDetail[]>) => {
			state.EvaluationGroupDetails = state.EvaluationGroupDetails?.map((item) =>
				item.Type == EVALUATION_TYPES.multipleChoice || item.Type == EVALUATION_TYPES.evaluate
					? {
							...item,
							EvaluationQuestionDetails: item?.EvaluationQuestionDetails?.map((item) =>
								item.Id === payload[0].EvaluationQuestionId
									? {
											...item,
											EvaluationOptionDetails: payload
									  }
									: item
							)
					  }
					: item
			)
		}
	}
})

export const { setSubmitData, saveEssayAnswer, saveMultipleAnswer } = evaluationStateReducer.actions
export default evaluationStateReducer.reducer
