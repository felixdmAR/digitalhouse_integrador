import React from 'react'
import PropTypes from 'prop-types'

const GridItemDate = ({ children }) => (
	<span className="grid-item-date">{children}</span>
)

export default GridItemDate

GridItemDate.propTypes = {
	children: PropTypes.node
}

GridItemDate.defaultProps = { children: React.Node }
