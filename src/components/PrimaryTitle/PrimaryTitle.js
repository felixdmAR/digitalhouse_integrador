import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled.h1`
	font-size: 1.7em;
	text-align: left;
	color: black;
`

const PrimaryTitle = ({ children }) => <Title>{children}</Title>

export default PrimaryTitle

PrimaryTitle.propTypes = { children: PropTypes.node }

PrimaryTitle.defaultProps = { children: React.Node }
