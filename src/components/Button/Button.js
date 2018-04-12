import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, icon, active, type, Onclick, id }) => (
	<a
		id={id}
		className={`btn btn-${type} ${active ? 'active' : 'disabled'}`}
		onClick={Onclick}>
		<i className={`mdi mdi-${icon}`} aria-hidden="true" />
		{children}
	</a>
)

export default Button

Button.propTypes = {
	children: PropTypes.node,
	icon: PropTypes.node,
	active: PropTypes.bool,
	type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
	onClick: PropTypes.func,
	id: PropTypes.number
}

Button.defaultProps = {
	id: 0,
	icon: null,
	type: 'primary',
	active: false,
	onClick: () => {},
	children: React.Node
}
