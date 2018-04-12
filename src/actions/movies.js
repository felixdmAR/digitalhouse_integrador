//Movies

export const refreshMoviesRequest = () => ({
	type: 'REFRESH_MOVIES_REQUEST'
})

//Popular
export const popularMoviesFetchSuccess = movies => ({
	type: 'FETCH_POPULAR_MOVIES_SUCCESS',
	movies
})

export const popularMoviesFetchRequest = () => ({
	type: 'FETCH_POPULAR_MOVIES_REQUEST'
})

export const popularMoviesFetchFailure = error => ({
	type: 'FETCH_POPULAR_MOVIES_FAILURE',
	error
})

//Discover
export const discoverMoviesFetchSuccess = movies => ({
	type: 'FETCH_DISCOVER_MOVIES_SUCCESS',
	movies
})

export const discoverMoviesFetchRequest = () => ({
	type: 'FETCH_DISCOVER_MOVIES_REQUEST'
})

export const discoverMoviesFetchFailure = error => ({
	type: 'FETCH_DISCOVER_MOVIES_FAILURE',
	error
})

//Filters

export const filterMovieGenresFetchSuccess = genres => ({
	type: 'FETCH_MOVIE_GENRES_SUCCESS',
	genres
})

export const saveMovieFilters = filters => ({
	type: 'SAVE_MOVIE_FILTERS',
	filters
})
