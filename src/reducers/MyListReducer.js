let myListLocalStorage = localStorage.getItem('MyList')
let initialMyListData = myListLocalStorage ? JSON.parse(myListLocalStorage) : []

const initialFilterViews = () => {
	return [{ value: false, text: 'No visto' }, { value: true, text: 'Visto' }]
}

const initalState = {
	myList: initialMyListData,
	myListQty: initialMyListData ? initialMyListData.length : 0,
	isFetching: false,
	isFetched: false,
	error: null,
	wasViewedFilter: false,
	filterViewed: initialFilterViews()
}

const filterViewedList = (myList, state) => {
	if (!myList) return []

	let newFilterViewedList = myList.filter(data => {
		if (state.wasViewedFilter === '') {
			return data
		} else if (state.wasViewedFilter === data.view) {
			return data
		}
		return false
	})
	return newFilterViewedList
}

const getInitialMyListData = () => {
	myListLocalStorage = localStorage.getItem('MyList')
	return myListLocalStorage ? JSON.parse(myListLocalStorage) : []
}

const MyListReducer = (state = initalState, { type, ...payload }) => {
	switch (type) {
		case 'ADD_TO_MY_LIST':
			initialMyListData = getInitialMyListData()

			const exist = initialMyListData.find(data => {
				if (data.id === parseInt(payload.id, 10)) return data
				else return false
			})

			if (exist) return state

			const newList = [
				...state.myList,
				{
					id: payload.id,
					image: payload.image,
					title: payload.title,
					description: payload.description,
					date: payload.date,
					view: payload.view,
					type: payload.dataType
				}
			]

			localStorage.removeItem('MyList')
			localStorage.setItem('MyList', JSON.stringify(newList))

			return {
				...state,
				myList: newList,
				myListQty: newList.length
			}

		case 'REMOVE_FROM_MY_LIST':
			initialMyListData = getInitialMyListData()

			let newRemoveList = initialMyListData.filter(movieOrSerie => {
				if (movieOrSerie.id !== parseInt(payload.id, 10))
					return movieOrSerie
				else return false
			})

			localStorage.removeItem('MyList')
			localStorage.setItem('MyList', JSON.stringify(newRemoveList))

			return {
				...state,
				myListQty: newRemoveList ? newRemoveList.length : 0,
				myList: filterViewedList(newRemoveList, state)
			}

		case 'CHANGE_VIEWED_ITEM_FROM_MY_LIST':
			initialMyListData = getInitialMyListData()

			let newChangedViewItemList = initialMyListData.filter(
				movieOrSerie => {
					if (movieOrSerie.id !== parseInt(payload.id, 10))
						return movieOrSerie
					else return false
				}
			)

			let newViewItem = initialMyListData.filter(movieOrSerie => {
				if (movieOrSerie.id === parseInt(payload.id, 10))
					return movieOrSerie
				else return false
			})

			if (newViewItem[0]) newViewItem[0].view = !newViewItem[0].view
			newChangedViewItemList.push(newViewItem[0])

			localStorage.removeItem('MyList')
			localStorage.setItem(
				'MyList',
				JSON.stringify(newChangedViewItemList)
			)

			return {
				...state,
				myList: filterViewedList(newChangedViewItemList, state),
				isFetching: false,
				isFetched: true
			}

		case 'CHANGE_VIEWED_FILTER_FROM_MY_LIST':
			let viewed =
				payload.wasViewedFilter === ''
					? payload.wasViewedFilter
					: payload.wasViewedFilter === 'true' ? true : false

			initialMyListData = getInitialMyListData()
			let filteredMyList = filterViewedList(initialMyListData, {
				wasViewedFilter: viewed
			})

			return {
				...state,
				wasViewedFilter: viewed,
				myList: filteredMyList,
				isFetching: false,
				isFetched: true
			}

		case 'FETCH_MY_LIST_SUCCESS':
			initialMyListData = getInitialMyListData()

			return {
				...state,
				myList: filterViewedList(initialMyListData, state),
				isFetching: false,
				isFetched: true
			}
		default:
			return state
	}
}

export default MyListReducer
