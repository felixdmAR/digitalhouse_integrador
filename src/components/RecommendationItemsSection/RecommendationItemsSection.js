import React from 'react'
import ItemsSection, {
	ItemsSectionBody,
	ItemsSectionTitle
} from '../ItemsSection'
import PropTypes from 'prop-types'

const RecommendationItemsSection = ({
	loading,
	viewFilter,
	items,
	detailType
}) => (
	<ItemsSection>
		<ItemsSectionTitle title="Recomendaciones" />
		<ItemsSectionBody
			loadingMessage="No se encontraron recomendaciones"
			loading={loading}
			type={viewFilter}
			items={items}
			detailType={detailType}
		/>
	</ItemsSection>
)

export default RecommendationItemsSection

RecommendationItemsSection.propTypes = {
	loading: PropTypes.bool,
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	items: PropTypes.array,
	detailType: PropTypes.oneOf(['movie', 'serie', 'cache', ''])
}

RecommendationItemsSection.defaultProps = {
	loading: false,
	viewFilter: 'grid',
	items: [],
	detailType: 'movie'
}
