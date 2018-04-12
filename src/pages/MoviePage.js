import React from 'react'
import FiltersBar, {
	Filter,
	FilterLeft,
	FilterRight
} from '../components/FiltersBar'
import PrimaryTitle from '../components/PrimaryTitle'
import MoviesItemsSection from '../components/MoviesItemsSection'
import LayoutContainer from '../components/LayoutContainer'
import PropTypes from 'prop-types'

const MoviePage = ({
	defaultYearsFilter,
	defaultOrderByFilter,
	viewFilter,
	changeView,
	movies,
	loading,
	filterChange,
	filterGenres,
	filterYears,
	filterOrderBy
}) => (
	<LayoutContainer>
		<PrimaryTitle>Películas</PrimaryTitle>
		<FiltersBar>
			<FilterLeft>
				<Filter
					name="year"
					options={filterYears}
					filterChange={filterChange}
				/>
				<Filter
					name="order"
					options={filterOrderBy}
					filterChange={filterChange}
				/>
				<Filter
					name="genres"
					options={filterGenres}
					filterChange={filterChange}
				/>
			</FilterLeft>
			<FilterRight type={viewFilter} viewTypeChange={changeView} />
		</FiltersBar>
		<MoviesItemsSection
			loading={loading}
			movies={movies}
			type={viewFilter}
		/>
	</LayoutContainer>
)

export default MoviePage

MoviePage.propTypes = {
	defaultYearsFilter: PropTypes.array,
	defaultOrderByFilter: PropTypes.array,
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	changeView: PropTypes.func,
	movies: PropTypes.array,
	loading: PropTypes.bool,
	filterChange: PropTypes.func,
	filterGenres: PropTypes.array,
	filterYears: PropTypes.array,
	filterOrderBy: PropTypes.array
}

MoviePage.defaultProps = {
	defaultYearsFilter: [],
	defaultOrderByFilter: [],
	viewFilter: 'grid',
	changeView: () => {},
	movies: [],
	loading: false,
	filterChange: () => {},
	filterGenres: [],
	filterYears: [],
	filterOrderBy: []
}
