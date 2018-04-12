import React from 'react'
import NavbarBadge from './NavbarBadge'
import NavbarItem from './NavbarItem'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import SearchBox from '../SearchBox'

const search = (e, dispatch) => {
	if (e.key === 'Enter') {
		let serieOrMovie = e.target.value
		dispatch(push(`/search/movies/${serieOrMovie}`))
	}
}

const Navbar = ({ myListQty, location, dispatch }) => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<div className="container">
			<a className="navbar-brand" href="/">
				React Movie DB APP
			</a>

			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<NavLink
						exact
						className="nav-link"
						to="/"
						activeClassName="active">
						<NavbarItem>Inicio</NavbarItem>
					</NavLink>

					<NavLink
						className="nav-link"
						to="/movies"
						activeClassName="active">
						<NavbarItem>Peliculas</NavbarItem>
					</NavLink>

					<NavLink
						className="nav-link"
						to="/series"
						activeClassName="active">
						<NavbarItem>Series</NavbarItem>
					</NavLink>

					<NavLink
						className="nav-link"
						to="/mylist"
						activeClassName="active">
						<NavbarItem>
							Mi Lista <NavbarBadge number={myListQty} />
						</NavbarItem>
					</NavLink>
				</ul>

				<SearchBox onKeyPress={e => search(e, dispatch)} />
			</div>
		</div>
	</nav>
)

const mapStateToProps = state => ({
	myListQty: state.MyListReducer.myListQty
})

export default withRouter(connect(mapStateToProps)(Navbar))

Navbar.propTypes = {
	myListQty: PropTypes.number,
	location: PropTypes.object,
	dispatch: PropTypes.func
}

Navbar.defaultProps = {
	myListQty: 0,
	location: {},
	dispatch: () => {}
}
