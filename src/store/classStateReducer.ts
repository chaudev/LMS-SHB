import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	data: [] as any,
	currentClassDetails: null as any
}

const classStateReducer = createSlice({
	name: 'classState',
	initialState,
	reducers: {
		setCurrentClassDetails: (state, { payload }: PayloadAction<any>) => {
			state.currentClassDetails = payload
		}
	}
})

export const { setCurrentClassDetails } = classStateReducer.actions
export default classStateReducer.reducer
