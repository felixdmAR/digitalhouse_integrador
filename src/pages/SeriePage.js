import React from 'react'
import FiltersBar, {
	Filter,
	FilterLeft,
	FilterRight
} from '../components/FiltersBar'
import PrimaryTitle from '../components/PrimaryTitle'
import SeriesItemsSection from '../components/SeriesItemsSection'
import LayoutContainer from '../components/LayoutContainer'
import PropTypes from 'prop-types'

const SeriePage = ({
	defaultYearsFilter,
	defaultOrderByFilter,
	viewFilter,
	changeView,
	series,
	loading,
	filterChange,
	filterGenres,
	filterYears,
	filterOrderBy
}) => (
	<LayoutContainer>
		<PrimaryTitle>Series</PrimaryTitle>
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
		<SeriesItemsSection
			loading={loading}
			series={series}
			type={viewFilter}
		/>
	</LayoutContainer>
)

export default SeriePage

SeriePage.propTypes = {
	defaultYearsFilter: PropTypes.array,
	defaultOrderByFilter: PropTypes.array,
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	changeView: PropTypes.func,
	series: PropTypes.array,
	loading: PropTypes.bool,
	filterChange: PropTypes.func,
	filterGenres: PropTypes.array,
	filterYears: PropTypes.array,
	filterOrderBy: PropTypes.array
}

SeriePage.defaultProps = {
	defaultYearsFilter: [],
	defaultOrderByFilter: [],
	viewFilter: 'grid',
	changeView: () => {},
	series: [],
	loading: true,
	filterChange: () => {},
	filterGenres: [],
	filterYears: [],
	filterOrderBy: []
}
