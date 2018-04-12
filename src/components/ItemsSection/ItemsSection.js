import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ItemsSection extends Component {
	render() {
		const { children } = this.props

		return <section className="items-section">{children}</section>
	}
}

export default ItemsSection

ItemsSection.propTypes = {
	children: PropTypes.node
}

ItemsSection.defaultProps = {
	children: React.Node
}
