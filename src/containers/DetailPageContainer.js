import { connect } from 'react-redux'
import DetailPage from '../pages/DetailPage'
import { compose, lifecycle } from 'recompose'

import { setDetailType,
	fetchDetailSuccess,
	fetchDetailFailure,
	setViewFilter } from '../actions'

const mapStateToProps = state => ({
	detail: state.DetailReducer.detail,
	recommendations: state.DetailReducer.recommendations,
	loading: state.DetailReducer.isFetching,
	detailType: state.DetailReducer.detailType,
	viewFilter: state.ViewFilterReducer
})

const fecthSerieDetail = (id, dispatch, api) => {
	dispatch(setDetailType('serie'))

	Promise.all([
		api.axios.get(`/tv/${id}`),
		api.axios.get(`/tv/${id}/credits`),
		api.axios.get(`/tv/${id}/recommendations`, {
			params: {
				page: 1
			}
		})
	])
		.then(res => {
			let [serie, credits, recommendations] = res

			let detail = {
				title: serie.data.name,
				description: serie.data.overview,
				date: serie.data.first_air_date,
				image: serie.data.poster_path
					? 'https://image.tmdb.org/t/p/w500' + serie.data.poster_path
					: null
			}

			let crewList = []
			credits.data.cast.map(crew =>
				crewList.push({
					name: crew.name,
					character: crew.character
				})
			)
			detail.crews = crewList.splice(0, 6)

			let recommendationList = []
			recommendations.data.results.map(recommendation =>
				recommendationList.push({
					id: recommendation.id,
					image: recommendation.poster_path
						? 'https://image.tmdb.org/t/p/w500' +
						  recommendation.poster_path
						: null,
					title: recommendation.name,
					description: recommendation.overview,
					date: recommendation.first_air_date
				})
			)
			recommendationList = recommendationList.splice(0, 6)

			dispatch(fetchDetailSuccess({ detail, recommendationList }))
		})
		.catch(error => dispatch(fetchDetailFailure()))
}

const fetchMovieDetail = (id, dispatch, api) => {
	dispatch(setDetailType('movie'))

	Promise.all([
		api.axios.get(`/movie/${id}`),
		api.axios.get(`/movie/${id}/credits`),
		api.axios.get(`/movie/${id}/recommendations`, {
			params: {
				page: 1
			}
		})
	])
		.then(res => {
			let [movie, credits, recommendations] = res

			let detail = {
				title: movie.data.original_title,
				description: movie.data.overview,
				date: movie.data.release_date,
				image: movie.data.poster_path
					? 'https://image.tmdb.org/t/p/w500' + movie.data.poster_path
					: null
			}

			let crewList = []
			credits.data.cast.map(crew =>
				crewList.push({
					name: crew.name,
					character: crew.character
				})
			)
			detail.crews = crewList.splice(0, 6)

			let recommendationList = []
			recommendations.data.results.map(recommendation =>
				recommendationList.push({
					id: recommendation.id,
					image: recommendation.poster_path
						? 'https://image.tmdb.org/t/p/w500' +
						  recommendation.poster_path
						: null,
					title: recommendation.original_title,
					description: recommendation.overview,
					date: recommendation.release_date
				})
			)
			recommendationList = recommendationList.splice(0, 6)

			dispatch(fetchDetailSuccess({ detail, recommendationList }))
		})
		.catch(error => dispatch(fetchDetailFailure()))
}

const fetchCacheDetail = (id, dispatch, api) => {
	const myListLocalStorage = localStorage.getItem('MyList')
	const initialMyListData = myListLocalStorage
		? JSON.parse(myListLocalStorage)
		: []

	const exist = initialMyListData.find(data => {
		if (data.id === parseInt(id, 10)) return data
		else return false
	})

	if (!exist) dispatch(fetchDetailFailure())

	switch (exist.type) {
		case 'movie':
			fetchMovieDetail(id, dispatch, api)
			break
		case 'serie':
			fecthSerieDetail(id, dispatch, api)
			break
		default:
			dispatch(fetchDetailFailure())
			break
	}
}

const fetchDetail = (id, detailType) => (dispatch, getState, { api }) => {
	dispatch(setViewFilter('grid'))

	switch (detailType) {
		case 'movie':
			fetchMovieDetail(id, dispatch, api)
			break
		case 'serie':
			fecthSerieDetail(id, dispatch, api)
			break
		case 'cache':
			fetchCacheDetail(id, dispatch, api)
			break
		default:
			break
	}
}

const mapDispatchToProps = {
	fetchDetail
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	lifecycle({
		componentDidMount() {
			let detailType = this.props.match.params.type
			let id = this.props.match.params.id

			this.props.fetchDetail(id, detailType)
		},
		shouldComponentUpdate(nextProps, nextState) {
			this.props.fetchDetail(
				nextProps.match.params.id,
				nextProps.match.params.type
			)
			return true
		}
	})
)(DetailPage)
