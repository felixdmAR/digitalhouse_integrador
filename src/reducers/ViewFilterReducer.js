const ViewFilter = (state = 'grid', action) => {
	switch (action.type) {
		case 'SET_VIEW_FILTER':
			return action.filter
		default:
			return state
	}
}

export default ViewFilter
