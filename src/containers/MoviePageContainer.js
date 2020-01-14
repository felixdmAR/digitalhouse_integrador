import { connect } from 'react-redux'
import MoviePage from '../pages/MoviePage'
import { compose, lifecycle } from 'recompose'
import {
	filterMovieGenresFetchSuccess,
	saveMovieFilters,
	popularMoviesFetchSuccess,
	popularMoviesFetchRequest,
	popularMoviesFetchFailure,
	discoverMoviesFetchSuccess,
	discoverMoviesFetchRequest,
	discoverMoviesFetchFailure
} from '../slices/MovieSlice'
import { setViewFilter } from '../actions'

const mapStateToProps = state => ({
	movies: state.MovieReducer.movies,
	loading: state.MovieReducer.isFetching,
	filterGenres: state.MovieReducer.filterGenres,
	filterYears: state.MovieReducer.filterYears,
	filterOrderBy: state.MovieReducer.filterOrderBy,
	viewFilter: state.ViewFilterReducer
})

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

const fetchGenres = () => (dispatch, getState, { api }) => {
	api.axios.get(`/genre/movie/list`).then(res => {
		if (res.status !== 200) return

		let genres = []
		genres.push({ value: '', text: 'Géneros' })

		res.data.genres.map(genre =>
			genres.push({ value: genre.id, text: genre.name })
		)

		dispatch(filterMovieGenresFetchSuccess(genres))
	})
}

const internalFetchPopularMovies = (dispatch, api) => {
	dispatch(popularMoviesFetchRequest())

	api.axios
		.get(`/movie/popular`, {
			params: { page: 1 }
		})
		.then(
			res => {
				if (res.status !== 200) return

				let movies = []
				res.data.results.map(movie =>
					movies.push({
						id: movie.id,
						inLocalStorage: haveMovieInLocalStorage(movie.id),
						title: movie.title,
						description: movie.overview,
						date: movie.release_date,
						image:
							'https://image.tmdb.org/t/p/w500/' +
							movie.poster_path
					})
				)
				dispatch(popularMoviesFetchSuccess(movies.slice(0, 18)))
			},
			err => dispatch(popularMoviesFetchFailure(err.message))
		)
}

const fetchPopularMovies = () => (dispatch, getState, { api }) => {
	internalFetchPopularMovies(dispatch, api)
}

const changeView = (type, e) => dispatch => {
	dispatch(setViewFilter(type))
}

const filterChange = (type, e) => (dispatch, getState, { api }) => {
	let state = getState()
	let { filters } = state.MovieReducer
	let [filterYear, filterOrder, filterGenre] = filters

	const value = e.target.value
	switch (type) {
		case 'year':
			filterYear = value
			break
		case 'order':
			filterOrder = value
			break
		case 'genres':
			filterGenre = value
			break
		default:
			break
	}

	dispatch(saveMovieFilters([filterYear, filterOrder, filterGenre]))

	if (filterYear === '' && filterOrder === '' && filterGenre === '') {
		internalFetchPopularMovies(dispatch, api)
		return
	}

	dispatch(discoverMoviesFetchRequest())
	api.axios
		.get(`/discover/movie`, {
			params: {
				page: 1,
				sort_by: filterOrder,
				year: filterYear,
				with_genres: filterGenre
			}
		})
		.then(
			res => {
				if (res.status !== 200) return

				let movies = []
				res.data.results.map(movie =>
					movies.push({
						id: movie.id,
						title: movie.title,
						inLocalStorage: haveMovieInLocalStorage(movie.id),
						description: movie.overview,
						date: movie.release_date,
						image: movie.poster_path
							? 'https://image.tmdb.org/t/p/w500/' +
							  movie.poster_path
							: null
					})
				)

				dispatch(discoverMoviesFetchSuccess(movies.slice(0, 18)))
			},
			err => dispatch(discoverMoviesFetchFailure(err))
		)
}

const mapDispatchToProps = {
	fetchPopularMovies,
	fetchGenres,
	changeView,
	filterChange
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	lifecycle({
		componentDidMount() {
			this.props.fetchGenres()
			this.props.fetchPopularMovies()
		}
	})
)(MoviePage)
