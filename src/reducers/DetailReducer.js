const initalState = {
	detail: {},
	recommendations: [],
	isFetching: true,
	isFetched: false,
	error: null,
	detailType: ''
}

const DetailReducer = (state = initalState, { type, ...payload }) => {
	switch (type) {
		case 'SET_DETAIL_TYPE':
			return {
				...state,
				detailType: payload.detailType
			}
		case 'FETCH_DETAIL_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'FETCH_DETAIL_SUCCESS':
			return {
				...state,
				detail: payload.detail,
				recommendations: payload.recommendations,
				isFetching: false,
				isFetched: true
			}
		case 'FETCH_DETAIL_FAILURE':
			return {
				...state,
				error: payload.error,
				isFetching: false,
				isFetched: false
			}
		default:
			return state
	}
}

export default DetailReducer
