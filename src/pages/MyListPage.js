import React from 'react'
import FiltersBar, {
	Filter,
	FilterLeft,
	FilterRight
} from '../components/FiltersBar'
import PrimaryTitle from '../components/PrimaryTitle'
import MyListItemsSection from '../components/MyListItemsSection'
import LayoutContainer from '../components/LayoutContainer'
import PropTypes from 'prop-types'

const MyListPage = ({
	viewFilter,
	changeView,
	myList,
	loading,
	filterChange,
	filterViewed
}) => (
	<LayoutContainer>
		<PrimaryTitle>Mi Lista</PrimaryTitle>
		<FiltersBar>
			<FilterLeft>
				<Filter
					name="viewed"
					options={filterViewed}
					filterChange={filterChange}
				/>
			</FilterLeft>
			<FilterRight type={viewFilter} viewTypeChange={changeView} />
		</FiltersBar>
		<MyListItemsSection
			loading={loading}
			myList={myList}
			type={viewFilter}
		/>
	</LayoutContainer>
)

export default MyListPage

MyListPage.propTypes = {
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	changeView: PropTypes.func,
	myList: PropTypes.array,
	loading: PropTypes.bool,
	filterChange: PropTypes.func,
	filterViewed: PropTypes.array
}

MyListPage.defaultProps = {
	viewFilter: 'grid',
	changeView: () => {},
	myList: [],
	loading: true,
	filterChange: () => {},
	filterViewed: []
}
