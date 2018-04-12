import React from 'react'
import PropTypes from 'prop-types'

const LayoutContainer = ({ children }) => (
	<div className="py-5 bg-light">
		<div className="container">{children}</div>
	</div>
)

export default LayoutContainer

LayoutContainer.propTypes = { children: PropTypes.node }

LayoutContainer.defaultProps = { children: React.Node }
