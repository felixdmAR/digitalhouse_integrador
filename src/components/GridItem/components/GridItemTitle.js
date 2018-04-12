import React from 'react'
import PropTypes from 'prop-types'

const GridItemTitle = ({ children }) => (
	<span className="grid-item-title">{children}</span>
)

export default GridItemTitle

GridItemTitle.propTypes = {
	children: PropTypes.node
}

GridItemTitle.defaultProps = { children: React.Node }
