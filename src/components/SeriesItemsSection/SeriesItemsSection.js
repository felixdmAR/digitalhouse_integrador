import React from 'react'
import { connect } from 'react-redux'
import ItemsSection, {
	ItemsSectionBody,
	ItemsSectionTitle
} from '../ItemsSection'
import Button from '../Button'
import {
	addToMyList,
	refreshSeriesRequest,
	refreshSearchSeries
} from '../../actions'
import PropTypes from 'prop-types'

const mapStateToProps = state => ({
	series: state.routing.location.pathname.includes('search')
		? state.SearchReducer.data
		: state.SerieReducer.series
})

const serieActionsButtons = addToList => (
	<Button
		type="primary"
		active={true}
		icon="heart-outline"
		Onclick={addToList}>
		Agregar a Mi Lista
	</Button>
)

const SeriesItemsSection = ({ loading, type, series, addToList }) => (
	<ItemsSection>
		<ItemsSectionTitle title="Series" />
		<ItemsSectionBody
			loadingMessage="No se encontraron Series"
			loading={loading}
			type={type}
			items={series}
			detailType="serie"
			listItemActionButtons={serieActionsButtons(addToList)}
		/>
	</ItemsSection>
)

const addToListDispatcher = e => (dispatch, getState) => {
	const selectedId = parseInt(e.target.getAttribute('id'), 10)
	const { routing, SearchReducer, SerieReducer } = getState()
	let serie
	if (routing.location.pathname.includes('search')) {
		serie = SearchReducer.data.find(serie => {
			if (serie.id === selectedId) return serie
			else return false
		})
	} else {
		serie = SerieReducer.series.find(serie => {
			if (serie.id === selectedId) return serie
			else return false
		})
	}

	if (serie)
		dispatch(
			addToMyList(
				serie.id,
				serie.image,
				serie.title,
				serie.description,
				serie.date,
				'serie'
			)
		)

	if (routing.location.pathname.includes('search'))
		dispatch(refreshSearchSeries())
	else dispatch(refreshSeriesRequest())
}

const mapDispatchToProps = {
	addToList: addToListDispatcher
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesItemsSection)

SeriesItemsSection.propTypes = {
	loading: PropTypes.bool,
	type: PropTypes.oneOf(['grid', 'list']),
	series: PropTypes.array,
	addToList: PropTypes.func
}

SeriesItemsSection.defaultProps = {
	loading: false,
	type: 'grid',
	series: [],
	addToList: () => {}
}
