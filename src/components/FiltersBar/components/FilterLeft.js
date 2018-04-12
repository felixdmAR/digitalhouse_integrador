import React from 'react'
import PropTypes from 'prop-types'

const FilterLeft = ({ children }) => (
	<div className="filters-bar-left">{children}</div>
)

export default FilterLeft

FilterLeft.propTypes = {
	children: PropTypes.node
}

FilterLeft.defaultProps = { children: React.Node }
