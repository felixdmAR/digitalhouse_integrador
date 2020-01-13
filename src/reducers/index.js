import MovieReducer from '../slices/MoviesSlice'
import ViewFilterReducer from './ViewFilterReducer'
import SerieReducer from './SerieReducer'
import MyListReducer from './MyListReducer'
import DetailReducer from '../slices/DetailSlice'
import SearchReducer from './SearchReducer'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from '@reduxjs/toolkit'

export default combineReducers({
	DetailReducer,
	MovieReducer,
	SerieReducer,
	MyListReducer,
	SearchReducer,
	ViewFilterReducer,
	routing: routerReducer
})
