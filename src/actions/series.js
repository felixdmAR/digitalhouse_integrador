//Movies

export const refreshSeriesRequest = () => ({
	type: 'REFRESH_SERIES_REQUEST'
})

//Popular
export const popularSeriesFetchSuccess = series => ({
	type: 'FETCH_POPULAR_SERIES_SUCCESS',
	series
})

export const popularSeriesFetchRequest = () => ({
	type: 'FETCH_POPULAR_SERIES_REQUEST'
})

export const popularSeriesFetchFailure = error => ({
	type: 'FETCH_POPULAR_SERIES_FAILURE',
	error
})

//Discover
export const discoverSeriesFetchSuccess = series => ({
	type: 'FETCH_DISCOVER_SERIES_SUCCESS',
	series
})

export const discoverSeriesFetchRequest = () => ({
	type: 'FETCH_DISCOVER_SERIES_REQUEST'
})

export const discoverSeriesFetchFailure = error => ({
	type: 'FETCH_DISCOVER_SERIES_FAILURE',
	error
})

//Filters

export const filterSeriesGenresFetchSuccess = genres => ({
	type: 'FETCH_SERIES_GENRES_SUCCESS',
	genres
})

export const saveSeriesFilters = filters => ({
	type: 'SAVE_SERIES_FILTERS',
	filters
})
