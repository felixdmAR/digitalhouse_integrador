import React from 'react'
import ItemsSection, {
	ItemsSectionBody,
	ItemsSectionTitle
} from '../ItemsSection'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PopularMyListItemsSection = ({ loading, viewFilter, myList }) => (
	<ItemsSection>
		<ItemsSectionTitle title="Mi Lista">
			<Link to="mylist">Ver todas</Link>
		</ItemsSectionTitle>
		<ItemsSectionBody
			loadingMessage="No hay items en Mi Lista"
			loading={loading}
			type={viewFilter}
			items={myList}
			detailType="cache"
		/>
	</ItemsSection>
)

export default PopularMyListItemsSection

PopularMyListItemsSection.propTypes = {
	loading: PropTypes.bool,
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	myList: PropTypes.array
}

PopularMyListItemsSection.defaultProps = {
	loading: false,
	viewFilter: 'grid',
	myList: []
}
