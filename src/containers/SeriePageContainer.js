import { connect } from 'react-redux'
import SeriePage from '../pages/SeriePage'
import { compose, lifecycle } from 'recompose'

import { 
	setViewFilter,	
	filterSeriesGenresFetchSuccess,
	saveSeriesFilters,
	popularSeriesFetchSuccess,
	popularSeriesFetchRequest,
	popularSeriesFetchFailure,
	discoverSeriesFetchSuccess,
	discoverSeriesFetchRequest,
	discoverSeriesFetchFailure
} from '../actions'

const mapStateToProps = state => ({
	series: state.SerieReducer.series,
	loading: state.SerieReducer.isFetching,
	filterGenres: state.SerieReducer.filterGenres,
	filterYears: state.SerieReducer.filterYears,
	filterOrderBy: state.SerieReducer.filterOrderBy,
	viewFilter: state.ViewFilterReducer
})

const haveSerieInLocalStorage = id => {
	let myListLocalStorage = localStorage.getItem('MyList')
	let initialMyListData = myListLocalStorage
		? JSON.parse(myListLocalStorage)
		: []

	let hasSerie = initialMyListData.filter(movieOrSerie => {
		if (movieOrSerie.id === parseInt(id, 10)) return movieOrSerie
		else return false
	})

	return hasSerie && hasSerie.length > 0 ? true : false
}

const fetchGenres = () => (dispatch, getState, { api }) => {
	api.axios.get(`/genre/tv/list`).then(res => {
		if (res.status !== 200) return

		let genres = []
		genres.push({ value: '', text: 'Géneros' })

		res.data.genres.map(genre =>
			genres.push({ value: genre.id, text: genre.name })
		)

		dispatch(filterSeriesGenresFetchSuccess(genres))
	})
}

const internalFetchPopularSeries = (dispatch, api) => {
	dispatch(popularSeriesFetchRequest())

	api.axios
		.get(`/tv/popular`, {
			params: { page: 1 }
		})
		.then(
			res => {
				if (res.status !== 200) return

				let series = []
				res.data.results.map(serie =>
					series.push({
						id: serie.id,
						inLocalStorage: haveSerieInLocalStorage(serie.id),
						title: serie.name,
						description: serie.overview,
						date: serie.first_air_date,
						image:
							'https://image.tmdb.org/t/p/w500/' +
							serie.poster_path
					})
				)
				dispatch(popularSeriesFetchSuccess(series.slice(0, 18)))
			},
			err => dispatch(popularSeriesFetchFailure(err.message))
		)
}

const fetchPopularSeries = () => (dispatch, getState, { api }) => {
	internalFetchPopularSeries(dispatch, api)
}

const changeView = (type, e) => dispatch => {
	dispatch(setViewFilter(type))
}

const filterChange = (type, e) => (dispatch, getState, { api }) => {
	let state = getState()
	let { filters } = state.SerieReducer
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

	dispatch(saveSeriesFilters([filterYear, filterOrder, filterGenre]))

	if (filterYear === '' && filterOrder === '' && filterGenre === '') {
		internalFetchPopularSeries(dispatch, api)
		return
	}

	dispatch(discoverSeriesFetchRequest())
	api.axios
		.get(`/discover/tv`, {
			params: {
				page: 1,
				sort_by: filterOrder,
				first_air_date_year: filterYear,
				with_genres: filterGenre
			}
		})
		.then(
			res => {
				if (res.status !== 200) return

				let series = []
				res.data.results.map(
					serie =>
						serie &&
						series.push({
							id: serie.id,
							title: serie.name,
							inLocalStorage: haveSerieInLocalStorage(serie.id),
							description: serie.overview,
							date: serie.first_air_date,
							image: serie.poster_path
								? 'https://image.tmdb.org/t/p/w500/' +
								  serie.poster_path
								: null
						})
				)

				dispatch(discoverSeriesFetchSuccess(series.slice(0, 18)))
			},
			err => dispatch(discoverSeriesFetchFailure(err))
		)
}

const mapDispatchToProps = {
	fetchPopularSeries,
	fetchGenres,
	changeView,
	filterChange
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	lifecycle({
		componentDidMount() {
			this.props.fetchGenres()
			this.props.fetchPopularSeries()
		}
	})
)(SeriePage)
