import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ value, name, options, filterChange }) => (
	<select
		value={value}
		name={'filter-' + name}
		id={'filter-' + name}
		onChange={e => {
			filterChange(name, e)
		}}
		className="form-control">
		{options &&
			options.map((option, ix) => (
				<option value={option.value} key={ix}>
					{option.text}
				</option>
			))}
	</select>
)

export default Filter

Filter.propTypes = {
	value: PropTypes.any,
	name: PropTypes.string,
	options: PropTypes.array,
	filterChange: PropTypes.func
}

Filter.defaultProps = {
	name: '',
	text: '',
	filterChange: () => {}
}
