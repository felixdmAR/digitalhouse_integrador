import React from 'react'
import ItemsSection, {
	ItemsSectionBody,
	ItemsSectionTitle
} from '../ItemsSection'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PopularMoviesItemsSection = ({ loading, viewFilter, movies }) => (
	<ItemsSection>
		<ItemsSectionTitle title="Películas más Populares">
			<Link to="movies">Ver todas</Link>
		</ItemsSectionTitle>
		<ItemsSectionBody
			loadingMessage="No se encontraron Peliculas Populares"
			loading={loading}
			type={viewFilter}
			items={movies}
			detailType="movie"
		/>
	</ItemsSection>
)

export default PopularMoviesItemsSection

PopularMoviesItemsSection.propTypes = {
	loading: PropTypes.bool,
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	movies: PropTypes.array
}

PopularMoviesItemsSection.defaultProps = {
	loading: false,
	viewFilter: 'grid',
	movies: []
}
