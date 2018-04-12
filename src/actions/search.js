export const refreshSearchMovies = () => ({
	type: 'REFRESH_SEARCH_MOVIES'
})

export const refreshSearchSeries = () => ({
	type: 'REFRESH_SEARCH_SERIES'
})

export const searchMoviesFetchSuccess = (movies, moviesQty, searchQuery) => ({
	type: 'FETCH_SEARCH_MOVIES_SUCCESS',
	movies,
	moviesQty,
	searchQuery
})

export const searchMoviesFetchRequest = () => ({
	type: 'FETCH_SEARCH_MOVIES_REQUEST'
})

export const searchMoviesFetchFailure = error => ({
	type: 'FETCH_SEARCH_MOVIES_FAILURE',
	error
})

export const searchSeriesFetchSuccess = (series, seriesQty, searchQuery) => ({
	type: 'FETCH_SEARCH_SERIES_SUCCESS',
	series,
	seriesQty,
	searchQuery
})

export const searchSeriesFetchRequest = () => ({
	type: 'FETCH_SEARCH_SERIES_REQUEST'
})

export const searchSeriesFetchFailure = error => ({
	type: 'FETCH_SEARCH_SERIES_FAILURE',
	error
})

export const saveSearchFilter = filterMoviesOrSeries => ({
	type: 'SAVE_SEARCH_FILTER',
	filterMoviesOrSeries
})
