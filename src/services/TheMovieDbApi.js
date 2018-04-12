import axios from 'axios'
const API_KEY = '1277f330bb184e7490100ad847b52cd4'

class TheMovieDbApi {
	constructor() {
		this.axios = axios.create({
			crossDomain: true,
			baseURL: 'https://api.themoviedb.org/3',
			params: {
				api_key: API_KEY,
				language: 'es-AR'
			}
		})
	}
}

export default TheMovieDbApi
