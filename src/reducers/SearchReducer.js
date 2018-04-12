const initalState = {
	data: [],
	searchQuery: '',
	moviesQty: 0,
	seriesQty: 0,
	isFetching: false,
	isFetched: false,
	error: null,
	filterMoviesOrSeries: 'movies'
}

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

const MovieReducer = (state = initalState, { type, ...payload }) => {
	switch (type) {
		case 'REFRESH_SEARCH_MOVIES':
			let newMovies = state.data.map(movie => {
				if (haveDataInLocalStorage(movie.id))
					movie.inLocalStorage = true
				else movie.inLocalStorage = false
				return movie
			})

			return {
				...state,
				data: newMovies
			}
		case 'REFRESH_SEARCH_SERIES':
			let newSeries = state.data.map(serie => {
				if (haveDataInLocalStorage(serie.id))
					serie.inLocalStorage = true
				else serie.inLocalStorage = false
				return serie
			})

			return {
				...state,
				data: newSeries
			}
		case 'SAVE_SEARCH_FILTER':
			return {
				...state,
				filterMoviesOrSeries: payload.filterMoviesOrSeries
			}
		case 'FETCH_SEARCH_MOVIES_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'FETCH_SEARCH_MOVIES_SUCCESS':
			return {
				...state,
				searchQuery: payload.searchQuery,
				data: payload.movies,
				moviesQty: payload.moviesQty,
				isFetching: false,
				isFetched: true
			}
		case 'FETCH_SEARCH_MOVIES_FAILURE':
			return {
				...state,
				error: payload.error,
				isFetching: false,
				isFetched: false
			}

		case 'FETCH_SEARCH_SERIES_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'FETCH_SEARCH_SERIES_SUCCESS':
			return {
				...state,
				data: payload.series,
				seriesQty: payload.seriesQty,
				isFetching: false,
				isFetched: true
			}
		case 'FETCH_SEARCH_SERIES_FAILURE':
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

export default MovieReducer
