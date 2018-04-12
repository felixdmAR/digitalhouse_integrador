import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Search = styled.input`
	font-style: italic;
	color: #ccc;
	font-size: 15px;
`

const SearchBox = ({ onKeyPress }) => (
	<form className="form-inline my-2 my-md-0">
		<Search
			className="form-control"
			type="text"
			placeholder="Buscar Película o Serie"
			aria-label="Search"
			onKeyPress={onKeyPress}
		/>
	</form>
)

export default SearchBox

SearchBox.propTypes = { onKeyPress: PropTypes.func }

SearchBox.defaultProps = {
	onKeyPress: () => {}
}
