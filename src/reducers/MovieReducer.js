const initialFilterYears = () => {
	let filterYears = []
	let startYear = 2000
	let endYear = startYear + 20
	filterYears.push({ value: '', text: 'Año' })
	for (let i = 1980; i < endYear; i++) {
		filterYears.push({ value: i, text: i.toString() })
	}

	return filterYears
}

const initialOrderBy = () => {
	return [
		{ value: '', text: 'Ordenar por' },
		{ value: 'popularity.asc', text: 'popularity.asc' },
		{ value: 'release_date.asc', text: 'release_date.asc' },
		{ value: 'release_date.desc', text: 'release_date.desc' },
		{ value: 'revenue.asc', text: 'revenue.asc' },
		{ value: 'revenue.desc', text: 'revenue.desc' },
		{ value: 'primary_release_date.asc', text: 'primary_release_date.asc' },
		{
			value: 'primary_release_date.desc',
			text: 'primary_release_date.desc'
		},
		{ value: 'original_title.asc', text: 'original_title.asc' },
		{ value: 'original_title.desc', text: 'original_title.desc' },
		{ value: 'vote_average.asc', text: 'vote_average.asc' },
		{ value: 'vote_average.desc', text: 'vote_average.desc' },
		{ value: 'vote_count.asc', text: 'vote_count.asc' },
		{ value: 'vote_count.desc', text: 'vote_count.desc' },
		{ value: 'popularity.desc', text: 'popularity.desc' }
	]
}

const initialFilters = ['', '', '']

const initalState = {
	movies: [],
	moviesSearchQty: 0,
	isFetching: false,
	isFetched: false,
	error: null,
	filters: initialFilters,
	filterGenres: [],
	filterYears: initialFilterYears(),
	filterOrderBy: initialOrderBy()
}

const haveMovieInLocalStorage = id => {
	let myListLocalStorage = localStorage.getItem('MyList')
	let initialMyListData = myListLocalStorage
		? JSON.parse(myListLocalStorage)
		: []

	let hasMovie = initialMyListData.filter(movieOrSerie => {
		if (movieOrSerie.id === parseInt(id, 10)) return movieOrSerie
		else return false
	})

	return hasMovie && hasMovie.length > 0 ? true : false
}

const MovieReducer = (state = initalState, { type, ...payload }) => {
	switch (type) {
		case 'SAVE_MOVIE_FILTERS':
			return {
				...state,
				filters: payload.filters
			}
		case 'REFRESH_MOVIES_REQUEST':
			if (!state.movies) return

			let newMovies = state.movies.map(movie => {
				if (haveMovieInLocalStorage(movie.id))
					movie.inLocalStorage = true
				else movie.inLocalStorage = false

				return movie
			})

			return {
				...state,
				movies: newMovies
			}
		case 'FETCH_POPULAR_MOVIES_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'FETCH_POPULAR_MOVIES_SUCCESS':
			return {
				...state,
				movies: payload.movies,
				isFetching: false,
				isFetched: true
			}
		case 'FETCH_POPULAR_MOVIES_FAILURE':
			return {
				...state,
				error: payload.error,
				isFetching: false,
				isFetched: false
			}

		case 'FETCH_DISCOVER_MOVIES_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'FETCH_DISCOVER_MOVIES_SUCCESS':
			return {
				...state,
				movies: payload.movies,
				moviesSearchQty: payload.movies.length,
				isFetching: false,
				isFetched: true
			}
		case 'FETCH_DISCOVER_MOVIES_FAILURE':
			return {
				...state,
				error: payload.error,
				isFetching: false,
				isFetched: false
			}

		case 'FETCH_MOVIE_GENRES_SUCCESS':
			return {
				...state,
				filterGenres: payload.genres
			}
		default:
			return state
	}
}

export default MovieReducer
