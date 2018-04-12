import React from 'react'
import GridItem from '../../GridItem'
import ListItem from '../../ListItem'
import ItemsSectionLoading from './ItemsSectionLoading'
import PropTypes from 'prop-types'

const ItemsSectionBody = ({
	type,
	items,
	loadingMessage,
	loading,
	gridItemActionButtons,
	listItemActionButtons,
	detailType
}) => (
	<div className="items-section-body">
		{loading && <ItemsSectionLoading />}

		{!loading &&
			type === 'grid' && (
				<div className="row">
					{!items ||
						(items &&
							items.length === 0 && (
								<ItemsSectionLoading message={loadingMessage} />
							))}

					{items.map((data, ix) => {
						return (
							<GridItem
								id={data.id}
								image={data.image}
								title={data.title}
								description={data.description}
								date={data.date}
								detailType={detailType}
								key={ix}>
								{React.Children.map(
									gridItemActionButtons,
									btn =>
										!data.inLocalStorage &&
										React.cloneElement(btn, {
											id: data.id
										})
								)}
							</GridItem>
						)
					})}
				</div>
			)}

		{!loading &&
			type === 'list' && (
				<div className="row">
					{!items ||
						(items &&
							items.length === 0 && (
								<ItemsSectionLoading message={loadingMessage} />
							))}

					{items.map((data, ix) => {
						return (
							<ListItem
								image={data.image}
								title={data.title}
								description={data.description}
								key={ix}>
								{React.Children.map(
									listItemActionButtons,
									btn =>
										!data.inLocalStorage &&
										React.cloneElement(btn, {
											id: data.id
										})
								)}
							</ListItem>
						)
					})}
				</div>
			)}

		{!items && !loading && <ItemsSectionLoading message={loadingMessage} />}
	</div>
)

export default ItemsSectionBody

ItemsSectionBody.propTypes = {
	loadingMessage: PropTypes.string,
	loading: PropTypes.bool,
	gridItemActionButtons: PropTypes.node,
	listItemActionButtons: PropTypes.node,
	detailType: PropTypes.oneOf(['movie', 'serie', 'cache', '']),
	items: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.string,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			date: PropTypes.string
		})
	).isRequired,
	type: PropTypes.oneOf(['grid', 'list']).isRequired
}

ItemsSectionBody.defaultProps = {
	loadingMessage: '',
	loading: true,
	gridItemActionButtons: React.Node,
	listItemActionButtons: React.Node,
	detailType: 'movie',
	items: [],
	type: 'grid'
}
