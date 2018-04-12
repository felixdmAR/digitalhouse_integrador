import React from 'react'
import PropTypes from 'prop-types'

const GridItemBody = ({ children }) => (
	<div className="grid-item-body">{children}</div>
)

export default GridItemBody

GridItemBody.propTypes = {
	children: PropTypes.node
}

GridItemBody.defaultProps = { children: React.Node }
