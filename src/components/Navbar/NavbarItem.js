import React from 'react'
import PropTypes from 'prop-types'

const NavBarItem = ({ children }) => <li className="nav-item">{children}</li>

export default NavBarItem

NavBarItem.propTypes = { children: PropTypes.node }

NavBarItem.defaultProps = { children: React.Node }
