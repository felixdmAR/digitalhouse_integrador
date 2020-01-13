import React, { Component } from 'react'
import { Provider } from 'react-redux'
import rootReducers from './reducers'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import Navbar from './components/Navbar'
import HomePageContainer from './containers/HomePageContainer'
import MyListPageContainer from './containers/MyListPageContainer'
import MoviePageContainer from './containers/MoviePageContainer'
import DetailPageContainer from './containers/DetailPageContainer'
import SeriePageContainer from './containers/SeriePageContainer'
import SearchPageContainer from './containers/SearchPageContainer'
import NotFoundPage from './pages/NotFoundPage'
import TheMovieDbApi from './services/TheMovieDbApi'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

const history = createHistory()
let api = new TheMovieDbApi()

const middleware = [
	...getDefaultMiddleware({
		thunk: {
			extraArgument: { api }
		},
		serializableCheck: false
	}),
	//thunk.withExtraArgument({ api }),
	routerMiddleware(history)
]

const store = configureStore({
	reducer: rootReducers,
	middleware: middleware,
	devTools: process.env.NODE_ENV !== 'production',
	enhancers: [],
	preloadedState: []
})

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div className="app">
						<header>
							<Navbar />
						</header>
						<main role="main">
							<Switch>
								<Route
									exact
									path="/"
									component={HomePageContainer}
								/>
								<Route
									path="/mylist"
									component={MyListPageContainer}
								/>
								<Route
									path="/movies"
									component={MoviePageContainer}
								/>
								<Route
									path="/series"
									component={SeriePageContainer}
								/>
								<Route
									path="/detail/:type/:id"
									component={DetailPageContainer}
								/>
								<Route
									path="/search/:type/:query"
									component={SearchPageContainer}
								/>
								<Route component={NotFoundPage} />
							</Switch>
						</main>
					</div>
				</ConnectedRouter>
			</Provider>
		)
	}
}

export default App
