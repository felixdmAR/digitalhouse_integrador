import { createSlice } from '@reduxjs/toolkit'

const haveDataInLocalStorage = id => {
	let myListLocalStorage = localStorage.getItem('MyList')
	let initialMyListData = myListLocalStorage
		? JSON.parse(myListLocalStorage)
		: []

	let hasData = initialMyListData.filter(movieOrSerie => {
		if (movieOrSerie.id === parseInt(id, 10)) return movieOrSerie
		else return false
	})

	return hasData && hasData.length > 0 ? true : false
}

const searchSlice = createSlice({
	name: 'SEARCH',
	initialState: {
		data: [],
		searchQuery: '',
		moviesQty: 0,
		seriesQty: 0,
		isFetching: false,
		isFetched: false,
		error: null,
		filterMoviesOrSeries: 'movies'
	},
	reducers: {
		saveSearchFilter(state, action) {
			state.filterMoviesOrSeries = action.payload
		},
		searchSeriesFetchFailure(state,action)
		{
			state.error = action.payload
			state.isFetching = false
			state.isFetched = false
		},
		searchSeriesFetchRequest(state,action)
		{
			state.isFetching = true
		},
		searchSeriesFetchSuccess(state,action)
		{
			state.searchQuery = action.payload.searchQuery
			state.data = action.payload.series
			state.seriesQty= action.payload.seriesQty
			state.isFetching= false
			state.isFetched= true
		},
		searchMoviesFetchFailure(state,action)
		{
			state.error = action.payload
			state.isFetching = false
			state.isFetched = false
		},
		searchMoviesFetchRequest(state,action)
		{
			state.isFetching = true
		},
		searchMoviesFetchSuccess(state,action)
		{
			state.searchQuery = action.payload.searchQuery
			state.data = action.payload.movies
			state.moviesQty = action.payload.moviesQty
			state.isFetching = false
			state.isFetched = true
		},
		refreshSearchSeries(state,action)
		{
			let newSeries = state.data.map(serie => {
				serie.inLocalStorage = haveDataInLocalStorage(serie.id)
				return serie
			})

			state.data = newSeries			
		},
		refreshSearchMovies(state,action)
		{
			let newMovies = state.data.map(movie => {
				movie.inLocalStorage = haveDataInLocalStorage(movie.id)
				return movie
			})

			state.data = newMovies			
		},
		
			
	}
})

export const {
	saveSearchFilter,
	searchSeriesFetchFailure,
	searchSeriesFetchRequest,
	searchSeriesFetchSuccess,
	searchMoviesFetchFailure,
	searchMoviesFetchRequest,
	searchMoviesFetchSuccess,
	refreshSearchSeries,
	refreshSearchMovies,
} = searchSlice.actions

export default searchSlice.reducer