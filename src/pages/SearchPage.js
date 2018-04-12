import React from 'react'
import FiltersBar, {
	SearchFilter,
	FilterLeft,
	FilterRight
} from '../components/FiltersBar'
import PrimaryTitle from '../components/PrimaryTitle'
import MoviesItemsSection from '../components/MoviesItemsSection'
import SeriesItemsSection from '../components/SeriesItemsSection'
import LayoutContainer from '../components/LayoutContainer'
import PropTypes from 'prop-types'

const SearchPage = ({
	viewFilter,
	changeView,
	data,
	searchQuery,
	loading,
	filterMoviesOrSeries,
	filterChange
}) => (
	<LayoutContainer>
		<PrimaryTitle>
			Búsqueda > "{searchQuery}" en{' '}
			{filterMoviesOrSeries === 'movies' ? 'Peliculas' : 'Series'}
		</PrimaryTitle>
		<FiltersBar>
			<FilterLeft>
				<SearchFilter filterChange={filterChange} />
			</FilterLeft>
			<FilterRight type={viewFilter} viewTypeChange={changeView} />
		</FiltersBar>

		{filterMoviesOrSeries === 'movies' ? (
			<MoviesItemsSection
				loading={loading}
				movies={data}
				type={viewFilter}
			/>
		) : (
			<SeriesItemsSection
				loading={loading}
				series={data}
				type={viewFilter}
			/>
		)}
	</LayoutContainer>
)

export default SearchPage

SearchPage.propTypes = {
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	changeView: PropTypes.func,
	data: PropTypes.array,
	searchQuery: PropTypes.string,
	loading: PropTypes.bool,
	filterMoviesOrSeries: PropTypes.string,
	filterChange: PropTypes.func
}

SearchPage.defaultProps = {
	viewFilter: 'grid',
	changeView: () => {},
	data: [],
	searchQuery: '',
	loading: true,
	filterMoviesOrSeries: 'movies',
	filterChange: () => {}
}
