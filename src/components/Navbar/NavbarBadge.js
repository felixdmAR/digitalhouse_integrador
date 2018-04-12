import React from 'react'
import PropTypes from 'prop-types'

const NavbarBadge = ({ number }) => (
	<span className="badge badge-danger">{number}</span>
)

export default NavbarBadge

NavbarBadge.propTypes = { number: PropTypes.number }

NavbarBadge.defaultProps = {
	number: 0
}
