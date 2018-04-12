import React, { Component } from 'react'
import LayoutContainer from '../components/LayoutContainer'
import PopularMoviesContainer from '../containers/PopularMoviesContainer'
import PopularSeriesContainer from '../containers/PopularSeriesContainer'
import PopularMyListContainer from '../containers/PopularMyListContainer'

class HomePage extends Component {
	render() {
		return (
			<LayoutContainer>
				<PopularMyListContainer />
				<PopularMoviesContainer />
				<PopularSeriesContainer />
			</LayoutContainer>
		)
	}
}

export default HomePage
