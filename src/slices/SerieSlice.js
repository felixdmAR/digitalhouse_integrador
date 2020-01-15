import { createSlice } from '@reduxjs/toolkit'

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

const serieSlice = createSlice({
	name: 'SERIE',
	initialState: {
		series: [],
		seriesSearchQty: 0,
		isFetching: false,
		isFetched: false,
		error: null,
		filters: initialFilters,
		filterGenres: [],
		filterYears: initialFilterYears(),
		filterOrderBy: initialOrderBy()
	},
	reducers: {
		refreshSeriesRequest(state, action) {	
			if (!state.series) return

			let newSeries = state.series.map(serie => {
				if (haveSerieInLocalStorage(serie.id))
					serie.inLocalStorage = true
				else serie.inLocalStorage = false

				return serie
			})

			state.series = newSeries			
		},
		popularSeriesFetchSuccess(state, action) {
			state.series = action.payload
			state.isFetching = false
			state.isFetched = true			
		},
		popularSeriesFetchRequest(state, action) {
			state.isFetching = true			
		},
		popularSeriesFetchFailure(state, action) {
			state.error= action.payload
			state.isFetching= false
			state.isFetched= false			
		},
		discoverSeriesFetchSuccess(state, action) {
			state.series= action.payload
			state.seriesSearchQty= action.payload.length
			state.isFetching= false
			state.isFetched= true			
		},
		discoverSeriesFetchRequest(state, action) {	
			state.isFetching= true
		},
		discoverSeriesFetchFailure(state, action) {	
			state.error= action.payload.error
			state.isFetching= false
			state.isFetched= false		
		},
		filterSeriesGenresFetchSuccess(state, action) {	
			state.filterGenres= action.payload		
		},
		saveSeriesFilters(state, action) {	
			state.filters= action.payload		
		}	
	}
})

export const {
	saveSeriesFilters,
	filterSeriesGenresFetchSuccess,
	discoverSeriesFetchFailure,
	discoverSeriesFetchRequest,
	discoverSeriesFetchSuccess,
	popularSeriesFetchFailure,
	popularSeriesFetchRequest,
	popularSeriesFetchSuccess,
	refreshSeriesRequest
} = serieSlice.actions

export default serieSlice.reducer