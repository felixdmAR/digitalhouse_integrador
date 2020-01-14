import React from 'react'
import { connect } from 'react-redux'
import ItemsSection, {
	ItemsSectionBody,
	ItemsSectionTitle
} from '../ItemsSection'
import Button from '../Button'
import {	
	refreshMoviesRequest,
} from '../../slices/MovieSlice'

import { addToMyList, refreshSearchMovies } from '../../actions'

import PropTypes from 'prop-types'

const mapStateToProps = state => ({
	movies: state.routing.location.pathname.includes('search')
		? state.SearchReducer.data
		: state.MovieReducer.movies
})

const movieActionsButtons = addToList => (
	<Button
		type="primary"
		active={true}
		icon="heart-outline"
		Onclick={addToList}>
		Agregar a Mi Lista
	</Button>
)

const MoviesItemsSection = ({ loading, type, movies, addToList }) => (
	<ItemsSection>
		<ItemsSectionTitle title="Películas" />
		<ItemsSectionBody
			loadingMessage="No se encontraron Peliculas"
			loading={loading}
			type={type}
			items={movies}
			detailType="movie"
			listItemActionButtons={movieActionsButtons(addToList)}
		/>
	</ItemsSection>
)

const addToListDispatcher = e => (dispatch, getState) => {
	const selectedId = parseInt(e.target.getAttribute('id'), 10)
	const { routing, SearchReducer, MovieReducer } = getState()
	let movie
	if (routing.location.pathname.includes('search')) {
		movie = SearchReducer.data.find(movie => {
			if (movie.id === selectedId) return movie
			else return false
		})
	} else {
		movie = MovieReducer.movies.find(movie => {
			if (movie.id === selectedId) return movie
			else return false
		})
	}

	if (movie)
		dispatch(
			addToMyList(
				movie.id,
				movie.image,
				movie.title,
				movie.description,
				movie.date,
				'movie'
			)
		)

	if (routing.location.pathname.includes('search'))
		dispatch(refreshSearchMovies())
	else dispatch(refreshMoviesRequest())
}

const mapDispatchToProps = {
	addToList: addToListDispatcher
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesItemsSection)

MoviesItemsSection.propTypes = {
	loading: PropTypes.bool,
	type: PropTypes.oneOf(['grid', 'list']),
	movies: PropTypes.array,
	addToList: PropTypes.func
}

MoviesItemsSection.defaultProps = {
	loading: false,
	type: 'grid',
	movies: [],
	addToList: () => {}
}
