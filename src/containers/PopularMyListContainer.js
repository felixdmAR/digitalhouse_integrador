import { connect } from 'react-redux'
import PopularMyListItemsSection from '../components/PopularMyListItemsSection'
import { compose, lifecycle } from 'recompose'
import { myListFetchSuccess } from '../actions'

const mapStateToProps = state => ({
	myList: state.MyListReducer.myList.slice(0, 6),
	loading: state.MyListReducer.isFetching,
	viewFilter: state.ViewFilterReducer
})

const fetchMyList = () => (dispatch, getState) => {
	dispatch(myListFetchSuccess(getState().MyListReducer.myList.slice(0, 6)))
}

export default compose(
	connect(mapStateToProps, { fetchMyList }),
	lifecycle({
		componentDidMount() {
			this.props.fetchMyList()
		}
	})
)(PopularMyListItemsSection)
