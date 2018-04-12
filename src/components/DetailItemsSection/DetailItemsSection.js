import React from 'react'
import { ItemsSectionLoading } from '../ItemsSection'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Overview = styled.p`
	font-style: italic;
`

const DetailItemsSection = ({ detail, loading }) => (
	<div>
		{loading && <ItemsSectionLoading />}
		{!loading && (
			<section className="detail-section">
				<div className="row">
					<div className="col-md-4">
						<img
							src={detail.image}
							alt="Movie"
							className="img-fluid"
						/>
					</div>
					<div className="col-md-8">
						<h1>
							{detail.title}
							<span>({detail.date})</span>
						</h1>
						<div>
							<h3>Overview</h3>
							<Overview>{detail.description}</Overview>
						</div>
						<br />
						<br />
						<br />
						<div>
							<h3>Featured Crew</h3>
							<div className="row">
								{detail.crews
									? detail.crews.map((crew, index) => (
											<div
												key={index}
												className="col-md-4">
												<h5>{crew.name}</h5>
												<p>{crew.character}</p>
											</div>
									  ))
									: null}
							</div>
						</div>
					</div>
				</div>
			</section>
		)}
	</div>
)

export default DetailItemsSection

DetailItemsSection.propTypes = {
	detail: PropTypes.object,
	loading: PropTypes.bool
}

DetailItemsSection.defaultProps = {
	detail: {},
	loading: false
}
