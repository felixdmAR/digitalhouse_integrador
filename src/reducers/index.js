import { combineReducers } from 'redux'
import MovieReducer from './MovieReducer'
import ViewFilterReducer from './ViewFilterReducer'
import SerieReducer from './SerieReducer'
import MyListReducer from './MyListReducer'
import DetailReducer from './DetailReducer'
import SearchReducer from './SearchReducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	DetailReducer,
	MovieReducer,
	SerieReducer,
	MyListReducer,
	SearchReducer,
	ViewFilterReducer,
	routing: routerReducer
})
