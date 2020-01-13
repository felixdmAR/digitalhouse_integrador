import { createSlice } from '@reduxjs/toolkit'

const detailSlice = createSlice({
	name: 'DETAIL',
	initialState: {
		detail: {},
		recommendations: [],
		isFetching: true,
		isFetched: false,
		error: null,
		detailType: ''
	},
	reducers: {
		setDetailType(state, action) {
			state.detailType = action.payload
		},
		fetchDetailRequest(state, action) {
			state.isFetching = true
		},
		fetchDetailSuccess(state, action) {
			state.detail = action.payload.detail
			state.recommendations = action.payload.recommendationList
			state.isFetching = false
			state.isFetched = true
		},
		fetchDetailFailure(state, action) {
			state.error = action.payload.error
			state.isFetching = false
			state.isFetched = false
		}
	}
})

export const {
	setDetailType,
	fetchDetailRequest,
	fetchDetailSuccess,
	fetchDetailFailure
} = detailSlice.actions

export default detailSlice.reducer
