import React from 'react'
import PropTypes from 'prop-types'

const ItemsSectionTitle = ({ children, title }) => (
	<h5 className="items-section-title">
		{title}
		{children}
	</h5>
)

export default ItemsSectionTitle

ItemsSectionTitle.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string
}

ItemsSectionTitle.defaultProp = {
	children: React.Node,
	title: ''
}
