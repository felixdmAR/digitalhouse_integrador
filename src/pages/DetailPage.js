import React from 'react'
import RecommendationItemsSection from '../components/RecommendationItemsSection'
import DetailItemsSection from '../components/DetailItemsSection'
import LayoutContainer from '../components/LayoutContainer'
import PropTypes from 'prop-types'

const DetailPage = ({
	detail,
	recommendations,
	loading,
	viewFilter,
	detailType
}) => (
	<LayoutContainer>
		<DetailItemsSection loading={loading} detail={detail} />
		<RecommendationItemsSection
			viewFilter={viewFilter}
			loading={loading}
			items={recommendations}
			detailType={detailType}
		/>
	</LayoutContainer>
)

export default DetailPage

DetailPage.propTypes = {
	detailType: PropTypes.oneOf(['movie', 'serie', 'cache', '']),
	recommendations: PropTypes.array,
	loading: PropTypes.bool,
	viewFilter: PropTypes.oneOf(['grid', 'list'])
}

DetailPage.defaultProps = {
	detailType: 'movie',
	recommendations: [],
	loading: false,
	viewFilter: 'grid'
}
