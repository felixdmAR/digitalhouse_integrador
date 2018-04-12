import React from 'react'
import PropTypes from 'prop-types'

const GridItemActions = ({ children }) => (
	<div className="grid-item-actions">{children}</div>
)

export default GridItemActions

GridItemActions.propTypes = {
	children: PropTypes.node
}

GridItemActions.defaultProps = { children: React.Node }
