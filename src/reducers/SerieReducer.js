const initialFilterYears = () => {
	let filterYears = []
	let startYear = 2000
	let endYear = startYear + 20
	filterYears.push({ value: '', text: 'Año' })
	for (let i = 1980; i < endYear; i++) {
		filterYears.push({ value: i, text: i.toString() })
	}

	return filterYears
}

const initialOrderBy = () => {
	return [
		{ value: '', text: 'Ordenar por' },
		{ value: 'popularity.asc', text: 'popularity.asc' },
		{ value: 'release_date.asc', text: 'release_date.asc' },
		{ value: 'release_date.desc', text: 'release_date.desc' },
		{ value: 'revenue.asc', text: 'revenue.asc' },
		{ value: 'revenue.desc', text: 'revenue.desc' },
		{ value: 'primary_release_date.asc', text: 'primary_release_date.asc' },
		{
			value: 'primary_release_date.desc',
			text: 'primary_release_date.desc'
		},
		{ value: 'original_title.asc', text: 'original_title.asc' },
		{ value: 'original_title.desc', text: 'original_title.desc' },
		{ value: 'vote_average.asc', text: 'vote_average.asc' },
		{ value: 'vote_average.desc', text: 'vote_average.desc' },
		{ value: 'vote_count.asc', text: 'vote_count.asc' },
		{ value: 'vote_count.desc', text: 'vote_count.desc' },
		{ value: 'popularity.desc', text: 'popularity.desc' }
	]
}

const initialFilters = ['', '', '']

const initalState = {
	series: [],
	seriesSearchQty: 0,
	isFetching: false,
	isFetched: false,
	error: null,
	filters: initialFilters,
	filterGenres: [],
	filterYears: initialFilterYears(),
	filterOrderBy: initialOrderBy()
}

const haveSerieInLocalStorage = id => {
	let myListLocalStorage = localStorage.getItem('MyList')
	let initialMyListData = myListLocalStorage
		? JSON.parse(myListLocalStorage)
		: []

	let hasSerie = initialMyListData.filter(movieOrSerie => {
		if (movieOrSerie.id === parseInt(id, 10)) return movieOrSerie
		else return false
	})

	return hasSerie && hasSerie.length > 0 ? true : false
}

const SerieReducer = (state = initalState, { type, ...payload }) => {
	switch (type) {
		case 'SAVE_SERIES_FILTERS':
			return {
				...state,
				filters: payload.filters
			}
		case 'REFRESH_SERIES_REQUEST':
			if (!state.series) return

			let newSeries = state.series.map(serie => {
				if (haveSerieInLocalStorage(serie.id))
					serie.inLocalStorage = true
				else serie.inLocalStorage = false

				return serie
			})

			return {
				...state,
				series: newSeries
			}
		case 'FETCH_POPULAR_SERIES_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'FETCH_POPULAR_SERIES_SUCCESS':
			return {
				...state,
				series: payload.series,
				isFetching: false,
				isFetched: true
			}
		case 'FETCH_POPULAR_SERIES_FAILURE':
			return {
				...state,
				error: payload.error,
				isFetching: false,
				isFetched: false
			}

		case 'FETCH_DISCOVER_SERIES_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'FETCH_DISCOVER_SERIES_SUCCESS':
			return {
				...state,
				series: payload.series,
				seriesSearchQty: payload.series.length,
				isFetching: false,
				isFetched: true
			}
		case 'FETCH_DISCOVER_SERIES_FAILURE':
			return {
				...state,
				error: payload.error,
				isFetching: false,
				isFetched: false
			}
		case 'FETCH_SERIES_GENRES_SUCCESS':
			return {
				...state,
				filterGenres: payload.genres
			}
		default:
			return state
	}
}

export default SerieReducer
