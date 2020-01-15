import { createSlice } from '@reduxjs/toolkit'

const viewFilterSlice = createSlice({
	name: 'DETAIL',
	initialState: {	
		state : 'grid'	
	},
	reducers: {
		setViewFilter(state = 'grid', action) {
			state = action.payload
			return state
		}}
})

export const {
	setViewFilter
} = viewFilterSlice.actions

export const ViewFilters = {
	SHOW_GRID: 'grid',
	SHOW_LIST: 'list'
}

export default viewFilterSlice.reducer
