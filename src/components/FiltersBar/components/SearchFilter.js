import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

const FilterStyled = styled.a`
	&:hover {
		color: white !important;
	}
`

const SearchFilter = ({
	filterChange,
	moviesQty,
	seriesQty,
	filterMoviesOrSeries
}) => (
	<div>
		<FilterStyled
			onClick={e => filterChange(e, 'movies')}
			className={`btn btn-outline-dark ${
				filterMoviesOrSeries === 'movies' ? 'active' : null
			}`}>
			Películas ({moviesQty})
		</FilterStyled>
		<FilterStyled
			onClick={e => filterChange(e, 'series')}
			className={`btn btn-outline-dark ${
				filterMoviesOrSeries === 'series' ? 'active' : null
			}`}>
			Series ({seriesQty})
		</FilterStyled>
	</div>
)

const mapStateToProps = state => ({
	moviesQty: state.SearchReducer.moviesQty,
	seriesQty: state.SearchReducer.seriesQty,
	filterMoviesOrSeries: state.SearchReducer.filterMoviesOrSeries
})

export default connect(mapStateToProps)(SearchFilter)

SearchFilter.propTypes = {
	filterChange: PropTypes.func,
	moviesQty: PropTypes.number,
	seriesQty: PropTypes.number,
	filterMoviesOrSeries: PropTypes.string
}

SearchFilter.defaultProps = {
	filterChange: () => {},
	moviesQty: 0,
	seriesQty: 0,
	filterMoviesOrSeries: ''
}
