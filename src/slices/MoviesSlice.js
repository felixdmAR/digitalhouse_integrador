import { createSlice } from '@reduxjs/toolkit'

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

const moviesSlice = createSlice({
	name: 'DETAIL',
	initialState: {
		movies: [],
		moviesSearchQty: 0,
		isFetching: false,
		isFetched: false,
		error: null,
		filters: initialFilters,
		filterGenres: [],
		filterYears: initialFilterYears(),
		filterOrderBy: initialOrderBy()
	},
	reducers: {
		saveMovieFilters(state, action) {
			state.filters = action.payload
		},
		refreshMoviesRequest(state, action) {
			if (!state.movies) return

			let newMovies = state.movies.map(movie => {
				if (haveMovieInLocalStorage(movie.id))
					movie.inLocalStorage = true
				else 
					movie.inLocalStorage = false

				return movie
			})

			state.movies = newMovies
		},
		popularMoviesFetchRequest(state, action) {
			state.isFetching = true			
		},
		popularMoviesFetchSuccess(state, action) {
			state.movies = action.payload
			state.isFetching = false
			state.isFetched = true
		},
		popularMoviesFetchFailure(state, action) {
			state.error = action.payload
			state.isFetching = false
			state.isFetched =false
		},
		discoverMoviesFetchRequest(state,action) {
			state.isFetching = true
		},
		discoverMoviesFetchSuccess(state,action) {
			state.movies = action.payload.movies
			state.moviesSearchQty = action.payload.movies.length
			state.isFetching = false
			state.isFetched = true
		},
		discoverMoviesFetchFailure(state,action) 
		{
			state.error = action.payload
			state.isFetching = false
			state.isFetched = false
		},
		filterMovieGenresFetchSuccess(state,action)
		{
			state.filterGenres = action.payload
		}
	}
})

export const {
	saveMovieFilters,
	refreshMoviesRequest,
	popularMoviesFetchRequest,
	popularMoviesFetchSuccess,
	popularMoviesFetchFailure,
	discoverMoviesFetchRequest,
	discoverMoviesFetchSuccess,
	discoverMoviesFetchFailure,
	filterMovieGenresFetchSuccess
} = moviesSlice.actions

export default moviesSlice.reducer
