import React from 'react'
import PropTypes from 'prop-types'
import {
	GridItemBody,
	GridItemDate,
	GridItemTitle,
	GridItemActions
} from '../GridItem'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

const toDetail = (e, id, detailType, dispatch, children) => {
	if (!children) dispatch(push(`/detail/${detailType}/${id}`))
}

const toDetailBody = (e, id, detailType, dispatch, children) => {
	if (children) dispatch(push(`/detail/${detailType}/${id}`))
}

const GridItem = ({
	title,
	date,
	image,
	id,
	children,
	detailType,
	dispatch
}) => (
	<article className="col-md-2">
		<div
			className="grid-item"
			onDoubleClick={e =>
				toDetailBody(e, id, detailType, dispatch, children)
			}
			onClick={e => toDetail(e, id, detailType, dispatch, children)}>
			{image ? (
				<img className="img-fluid" src={image} alt="Movie" />
			) : (
				<img
					className="img-fluid"
					src="http://via.placeholder.com/160x240?text=NO%20ENCONTRADA"
					alt="Movie"
				/>
			)}
			<GridItemBody>
				<GridItemTitle>{title}</GridItemTitle>
				<GridItemDate>{date}</GridItemDate>
				<GridItemActions>{children}</GridItemActions>
			</GridItemBody>
		</div>
	</article>
)

export default connect()(GridItem)

GridItem.propTypes = {
	title: PropTypes.string,
	date: PropTypes.string,
	image: PropTypes.string,
	id: PropTypes.number,
	children: PropTypes.node,
	detailType: PropTypes.string,
	dispatch: PropTypes.func
}

GridItem.defaultProps = {
	title: '',
	date: '',
	image: 'http://via.placeholder.com/160x240?text=NO%20ENCONTRADA',
	id: 0,
	children: React.Node,
	detailType: '',
	dispatch: () => {}
}
