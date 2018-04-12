//Detail

export const detailFetchSuccess = (detail, recommendations) => ({
	type: 'FETCH_DETAIL_SUCCESS',
	detail,
	recommendations
})

export const detailFetchRequest = () => ({
	type: 'FETCH_DETAIL_REQUEST'
})

export const detailFetchFailure = error => ({
	type: 'FETCH_DETAIL_FAILURE',
	error
})

export const setDetailType = detailType => ({
	type: 'SET_DETAIL_TYPE',
	detailType
})
