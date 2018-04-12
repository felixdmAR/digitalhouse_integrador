import React from 'react'
import { connect } from 'react-redux'
import ItemsSection, {
	ItemsSectionBody,
	ItemsSectionTitle
} from '../ItemsSection'
import Button from '../Button'
import { removeFromMyList, changeViewedItemFromMyList } from '../../actions'
import PropTypes from 'prop-types'

const mapStateToProps = state => ({
	wasViewedFilter: state.MyListReducer.wasViewedFilter
})

const listMovieActionsButtons = (
	removeFromList,
	changeViewForItem,
	wasViewedFilter
) => (
	<div>
		<Button
			type="primary"
			active={true}
			icon="delete"
			Onclick={removeFromList}>
			Quitar
		</Button>

		{!wasViewedFilter && (
			<Button
				type="primary"
				active={true}
				icon="eye-outline"
				Onclick={changeViewForItem}>
				Marcar como vista
			</Button>
		)}

		{wasViewedFilter && (
			<Button
				type="primary"
				active={true}
				icon="eye-off-outline"
				Onclick={changeViewForItem}>
				Marcar como no vista
			</Button>
		)}
	</div>
)

const gridMovieActionsButtons = (
	removeFromGrid,
	changeViewForItemGrid,
	wasViewedFilter
) => (
	<div>
		<Button
			type="primary"
			active={true}
			icon="delete"
			Onclick={removeFromGrid}
		/>

		{!wasViewedFilter && (
			<Button
				type="primary"
				active={true}
				icon="eye-outline"
				Onclick={changeViewForItemGrid}
			/>
		)}

		{wasViewedFilter && (
			<Button
				type="primary"
				active={true}
				icon="eye-off-outline"
				Onclick={changeViewForItemGrid}
			/>
		)}
	</div>
)

const MyListItemsSection = ({
	loading,
	type,
	myList,
	removeFromList,
	changeViewForItem,
	wasViewedFilter,
	removeFromListGrid,
	changeViewForItemGrid
}) => (
	<ItemsSection>
		<ItemsSectionTitle title="Mi Lista" />
		<ItemsSectionBody
			loadingMessage="No hay items en Mi Lista"
			loading={loading}
			type={type}
			items={myList}
			detailType="cache"
			gridItemActionButtons={gridMovieActionsButtons(
				removeFromListGrid,
				changeViewForItemGrid,
				wasViewedFilter
			)}
			listItemActionButtons={listMovieActionsButtons(
				removeFromList,
				changeViewForItem,
				wasViewedFilter
			)}
		/>
	</ItemsSection>
)

const removeFromMyListDispatcher = e => (dispatch, getState) => {
	let selectedId = parseInt(e.target.parentNode.getAttribute('id'), 10)
	dispatch(removeFromMyList(selectedId))
}

const changeViewForItemDispatcher = e => (dispatch, getState) => {
	let selectedId = parseInt(e.target.parentNode.getAttribute('id'), 10)
	dispatch(changeViewedItemFromMyList(selectedId))
}

const removeFromMyListDispatcherGrid = e => (dispatch, getState) => {
	let selectedId = parseInt(
		e.target.parentNode.parentNode.getAttribute('id'),
		10
	)
	dispatch(removeFromMyList(selectedId))
}

const changeViewForItemDispatcherGrid = e => (dispatch, getState) => {
	let selectedId = parseInt(
		e.target.parentNode.parentNode.getAttribute('id'),
		10
	)
	if (!selectedId)
		selectedId = parseInt(e.target.parentNode.getAttribute('id'), 10)
	dispatch(changeViewedItemFromMyList(selectedId))
}

const mapDispatchToProps = {
	removeFromList: removeFromMyListDispatcher,
	changeViewForItem: changeViewForItemDispatcher,
	removeFromListGrid: removeFromMyListDispatcherGrid,
	changeViewForItemGrid: changeViewForItemDispatcherGrid
}

export default connect(mapStateToProps, mapDispatchToProps)(MyListItemsSection)

MyListItemsSection.propTypes = {
	loading: PropTypes.bool,
	type: PropTypes.oneOf(['grid', 'list']),
	myList: PropTypes.array,
	removeFromList: PropTypes.func,
	changeViewForItem: PropTypes.func,
	wasViewedFilter: PropTypes.bool
}

MyListItemsSection.defaultProps = {
	loading: false,
	type: 'grid',
	myList: [],
	removeFromList: () => {},
	changeViewForItem: () => {},
	wasViewedFilter: false
}
