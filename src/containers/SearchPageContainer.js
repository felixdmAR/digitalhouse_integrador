import { connect, batch } from 'react-redux'
import SearchPage from '../pages/SearchPage'
import { compose, lifecycle } from 'recompose'
import {
	setViewFilter,
	saveSearchFilter,
	searchMoviesFetchSuccess,
	searchMoviesFetchRequest,
	searchMoviesFetchFailure,
	searchSeriesFetchSuccess,
	searchSeriesFetchRequest,
	searchSeriesFetchFailure
} from '../actions'

const mapStateToProps = state => ({
	data: state.SearchReducer.data,
	searchQuery: state.SearchReducer.searchQuery,
	loading: state.SearchReducer.isFetching,
	filterMoviesOrSeries: state.SearchReducer.filterMoviesOrSeries,
	viewFilter: state.ViewFilterReducer
})

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

const changeView = (type, e) => dispatch => {
	dispatch(setViewFilter(type))
}

const filterChange = (e, target) => (dispatch, getState, { api }) => {
	let state = getState()

	dispatch(saveSearchFilter(target))

	if (target === 'movies') {
		fetchMovies(dispatch, api, state.SearchReducer.searchQuery)
	} else {
		fetchSeries(dispatch, api, state.SearchReducer.searchQuery)
	}
}

const fetchData = (type, searchQuery) => (dispatch, getState, { api }) => {
	switch (type) {
		case 'movies':
			fetchMovies(dispatch, api, searchQuery)
			break
		case 'series':
			fetchSeries(dispatch, api, searchQuery)
			break
		default:
			break
	}
}

const fetchMovies = (dispatch, api, query) => {
	dispatch(searchMoviesFetchRequest())
	api.axios
		.get(`/search/movie`, {
			params: {
				page: 1,
				query: query
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
						inLocalStorage: haveDataInLocalStorage(movie.id),
						description: movie.overview,
						date: movie.release_date,
						image: movie.poster_path
							? 'https://image.tmdb.org/t/p/w500/' +
							  movie.poster_path
							: null
					})
				)

				dispatch(setViewFilter('grid'))
				dispatch(searchMoviesFetchSuccess(
					{
						movies: movies.slice(0, 18),
						moviesQty: res.data.total_results,
						searchQuery: query
					}
				))
			},
			err => dispatch(searchMoviesFetchFailure(err))
		)
}

const fetchSeries = (dispatch, api, query) => {
	dispatch(searchSeriesFetchRequest())
	api.axios
		.get(`/search/tv`, {
			params: {
				page: 1,
				query: query
			}
		})
		.then(
			res => {
				if (res.status !== 200) return

				let series = []
				res.data.results.map(serie =>
					series.push({
						id: serie.id,
						title: serie.name,
						inLocalStorage: haveDataInLocalStorage(serie.id),
						description: serie.overview,
						date: serie.first_air_date,
						image: serie.poster_path
							? 'https://image.tmdb.org/t/p/w500/' +
							  serie.poster_path
							: null
					})
				)

				dispatch(setViewFilter('grid'))
				dispatch(
					searchSeriesFetchSuccess(
						{
							series: series.slice(0, 18),
							seriesQty: res.data.total_results,
							searchQuery: query
						}
					))
			},
			err => dispatch(searchSeriesFetchFailure(err))
		)
}

const mapDispatchToProps = {
	fetchData,
	changeView,
	filterChange
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	lifecycle({
		componentDidMount() {
			let query = this.props.match.params.query
			this.props.fetchData('series', query)
			this.props.fetchData('movies', query)
		}
	})
)(SearchPage)
