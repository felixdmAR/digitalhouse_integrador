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
  
export * from './myList'
export * from './viewFilter'
export * from './search'
