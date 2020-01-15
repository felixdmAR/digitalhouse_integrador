export { setDetailType,
    fetchDetailRequest,
	fetchDetailSuccess,
	fetchDetailFailure } from '../slices/DetailSlice'

export {
    saveMovieFilters,
	refreshMoviesRequest,
	popularMoviesFetchRequest,
	popularMoviesFetchSuccess,
	popularMoviesFetchFailure,
	discoverMoviesFetchRequest,
	discoverMoviesFetchSuccess,
	discoverMoviesFetchFailure,
	filterMovieGenresFetchSuccess } from '../slices/MovieSlice'
    
export {  
    saveSeriesFilters,
	filterSeriesGenresFetchSuccess,
	discoverSeriesFetchFailure,
	discoverSeriesFetchRequest,
	discoverSeriesFetchSuccess,
	popularSeriesFetchFailure,
	popularSeriesFetchRequest,
	popularSeriesFetchSuccess,
    refreshSeriesRequest
} from '../slices/SerieSlice'

export { setViewFilter } from '../slices/ViewFilterSlice'

export {saveSearchFilter,
	searchSeriesFetchFailure,
	searchSeriesFetchRequest,
	searchSeriesFetchSuccess,
	searchMoviesFetchFailure,
	searchMoviesFetchRequest,
	searchMoviesFetchSuccess,
	refreshSearchSeries,
	refreshSearchMovies} from '../slices/SearchSlice'

export * from './myList'
