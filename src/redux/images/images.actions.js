import ShopActionTypes from './images.types';


export const fetchImagesFailure = errorMessage =>({
    type: ShopActionTypes.FETCH_IMAGES_FAILURE,
    payload: errorMessage
});

export const fetchImagesSuccess = (imagesMap) =>({
    type: ShopActionTypes.FETCH_IMAGES_SUCCESS,
    payload: imagesMap
});

export const fetchImagesStart = () =>({
    type: ShopActionTypes.FETCH_IMAGES_START
})

export const updateTotal = (total) =>({
    type: ShopActionTypes.UPDATE_TOTALS,
    payload: total
});

export const updateStart = (start) =>({
    type: ShopActionTypes.UPDATE_START,
    payload: start
});

export const updateEnd = (end) =>({
    type: ShopActionTypes.UPDATE_END,
    payload: end
});

export const updatePagination = (obj) =>({
    type: ShopActionTypes.UPDATE_PAGINATION,
    payload: obj
});