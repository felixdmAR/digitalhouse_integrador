import { connect } from 'react-redux'
import MyListPage from '../pages/MyListPage'
import { compose, lifecycle } from 'recompose'
import {
	setViewFilter,
	myListFetchSuccess,
	changeViewedFilterFromMyList
} from '../actions'

const mapStateToProps = state => ({
	myList: state.MyListReducer.myList,
	loading: state.MyListReducer.isFetching,
	filterViewed: state.MyListReducer.filterViewed,
	viewFilter: state.ViewFilterReducer
})

const internalAllMyList = (dispatch, getState) => {
	dispatch(myListFetchSuccess(getState().MyListReducer.myList))
}

const fetchMyList = () => (dispatch, getState) => {
	internalAllMyList(dispatch, getState)
}

const changeView = (type, e) => dispatch => {
	dispatch(setViewFilter(type))
}

const filterChange = (type, e) => (dispatch, getState) => {
	dispatch(changeViewedFilterFromMyList(e.target.value))
}

const mapDispatchToProps = {
	fetchMyList,
	changeView,
	filterChange
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	lifecycle({
		componentDidMount() {
			this.props.fetchMyList()
		}
	})
)(MyListPage)
