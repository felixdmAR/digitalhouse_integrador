import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FilterRight extends Component {
	render() {
		const { viewTypeChange, type } = this.props
		let gridActive =
			type === 'grid' ? 'btn btn-light active' : 'btn btn-light'
		let listActive =
			type === 'list' ? 'btn btn-light active' : 'btn btn-light'

		return (
			<div className="filters-bar-right">
				<a
					onClick={e => viewTypeChange('grid', e)}
					className={gridActive}>
					<i className="mdi mdi-view-grid" aria-hidden="true" />
				</a>
				<a
					onClick={e => viewTypeChange('list', e)}
					className={listActive}>
					<i className="mdi mdi-view-list" aria-hidden="true" />
				</a>
			</div>
		)
	}
}

export default FilterRight

FilterRight.defaultProps = {
	viewTypeChange: PropTypes.func,
	type: 'grid'
}
