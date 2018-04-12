import React from 'react'
import ItemsSection, {
	ItemsSectionBody,
	ItemsSectionTitle
} from '../ItemsSection'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PopularSeriesItemsSection = ({ loading, viewFilter, series }) => (
	<ItemsSection>
		<ItemsSectionTitle title="Series más Populares">
			<Link to="series">Ver todas</Link>
		</ItemsSectionTitle>
		<ItemsSectionBody
			loadingMessage="No se encontraron Series Populares"
			loading={loading}
			type={viewFilter}
			items={series}
			detailType="serie"
		/>
	</ItemsSection>
)

export default PopularSeriesItemsSection

PopularSeriesItemsSection.propTypes = {
	loading: PropTypes.bool,
	viewFilter: PropTypes.oneOf(['grid', 'list']),
	series: PropTypes.array
}

PopularSeriesItemsSection.defaultProps = {
	loading: false,
	viewFilter: 'grid',
	series: []
}
