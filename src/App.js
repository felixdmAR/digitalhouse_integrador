import React, { Component } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
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
let api = new TheMovieDbApi()

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose

const history = createHistory()
const enhancer = composeEnhancers(
	applyMiddleware(thunk.withExtraArgument({ api }), routerMiddleware(history))
)
const store = createStore(rootReducer, enhancer)

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
