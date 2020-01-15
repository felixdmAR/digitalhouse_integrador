import { connect } from 'react-redux'
import PopularSeriesItemsSection from '../components/PopularSeriesItemsSection'
import { compose, lifecycle } from 'recompose'

import {
	popularSeriesFetchSuccess,
	popularSeriesFetchRequest,
	popularSeriesFetchFailure
} from '../actions'

const mapStateToProps = state => ({
	series: state.SerieReducer.series,
	loading: state.SerieReducer.isFetching,
	viewFilter: state.ViewFilterReducer
})

const fetchPopularSeries = () => (dispatch, getState, { api }) => {
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
						title: serie.name,
						description: serie.overview,
						date: serie.first_air_date,
						image:
							'https://image.tmdb.org/t/p/w500/' +
							serie.poster_path
					})
				)

				dispatch(popularSeriesFetchSuccess(series.slice(0, 6)))
			},
			err => dispatch(popularSeriesFetchFailure(err.message))
		)
}

export default compose(
	connect(mapStateToProps, { fetchPopularSeries }),
	lifecycle({
		componentDidMount() {
			this.props.fetchPopularSeries()
		}
	})
)(PopularSeriesItemsSection)
