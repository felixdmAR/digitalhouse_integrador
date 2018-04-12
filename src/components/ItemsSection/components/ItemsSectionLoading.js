import React from 'react'
import PropTypes from 'prop-types'

const ItemsSectionLoading = ({ message }) => (
	<div className="dimmer">
		{message && <p>{message}</p>}
		{!message && (
			<div className="loading">
				<i className="mdi mdi-loading" aria-hidden="true" />
			</div>
		)}
	</div>
)

export default ItemsSectionLoading

ItemsSectionLoading.propTypes = { message: PropTypes.string }

ItemsSectionLoading.defaultProps = { message: '' }
