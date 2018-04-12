import { connect } from 'react-redux'
import HomePage from '../pages/HomePage'
import { compose, lifecycle } from 'recompose'
import { setViewFilter } from '../actions'

const mapStateToProps = state => ({
	viewFilter: state.ViewFilterReducer
})

const changeView = e => dispatch => {
	dispatch(setViewFilter('grid'))
}

const mapDispatchToProps = {
	changeView
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	lifecycle({
		componentDidMount() {
			this.props.changeView()
		}
	})
)(HomePage)
