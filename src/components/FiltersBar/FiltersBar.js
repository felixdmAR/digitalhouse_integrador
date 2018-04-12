import React from 'react'
import PropTypes from 'prop-types'

const FiltersBar = ({ children }) => (
	<div className="filters-bar">{children}</div>
)

export default FiltersBar

FiltersBar.propTypes = {
	children: PropTypes.node
}

FiltersBar.defaultProps = { children: React.Node }
