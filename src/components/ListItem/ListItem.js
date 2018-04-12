import React from 'react'
import PropTypes from 'prop-types'

const ListItem = ({ image, title, description, children }) => (
	<article className="col-md-6">
		<div className="list-item">
			<div className="list-item-img">
				{image ? (
					<img className="img-fluid" src={image} alt="Movie" />
				) : (
					<img
						className="img-fluid"
						src="http://via.placeholder.com/180x260?text=NO%20ENCONTRADA"
						alt="Movie"
					/>
				)}
			</div>
			<div className="list-item-body">
				<h3 className="list-item-title">{title}</h3>
				<div className="list-item-description">
					<p>{description}</p>
				</div>
				<div className="list-item-actions">{children}</div>
			</div>
		</div>
	</article>
)

export default ListItem

ListItem.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.node
}

ListItem.defaultProps = {
	image: 'http://via.placeholder.com/180x260?text=NO%20ENCONTRADA',
	title: '',
	description: '',
	children: React.Node
}
