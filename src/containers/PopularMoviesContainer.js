import { connect } from 'react-redux'
import PopularMoviesItemsSection from '../components/PopularMoviesItemsSection'
import { compose, lifecycle } from 'recompose'
import {
	popularMoviesFetchSuccess,
	popularMoviesFetchRequest,
	popularMoviesFetchFailure
} from '../slices/MoviesSlice'

const mapStateToProps = state => ({
	movies: state.MovieReducer.movies,
	loading: state.MovieReducer.isFetching,
	viewFilter: state.ViewFilterReducer
})

const fetchPopularMovies = () => (dispatch, getState, { api }) => {
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
						title: movie.title,
						description: movie.overview,
						date: movie.release_date,
						image:
							'https://image.tmdb.org/t/p/w500/' +
							movie.poster_path
					})
				)
				dispatch(popularMoviesFetchSuccess(movies.slice(0, 6)))
			},
			err => dispatch(popularMoviesFetchFailure(err.message))
		)
}

export default compose(
	connect(mapStateToProps, { fetchPopularMovies }),
	lifecycle({
		componentDidMount() {
			this.props.fetchPopularMovies()
		}
	})
)(PopularMoviesItemsSection)
