//MyList
export const addToMyList = (id, image, title, description, date, dataType) => ({
	type: 'ADD_TO_MY_LIST',
	id,
	image,
	title,
	description,
	date,
	view: false,
	dataType
})

export const removeFromMyList = id => ({
	type: 'REMOVE_FROM_MY_LIST',
	id
})

export const changeViewedFilterFromMyList = viewed => ({
	type: 'CHANGE_VIEWED_FILTER_FROM_MY_LIST',
	wasViewedFilter: viewed
})

export const changeViewedItemFromMyList = id => ({
	type: 'CHANGE_VIEWED_ITEM_FROM_MY_LIST',
	id
})

export const myListFetchSuccess = myList => ({
	type: 'FETCH_MY_LIST_SUCCESS',
	myList
})
