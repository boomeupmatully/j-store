import ShopActionTypes from './images.types';

const INITIAL_STATE = {
    photos: [],
    isFetching: false,
    imagesDataLoaded: false,
    start:0,
    end:0,
    perPage:50,
    total:0
}

const imagesReducer = (state = INITIAL_STATE, action) =>{

    switch (action.type) {
        
        case ShopActionTypes.FETCH_IMAGES_START:
            return{
                ...state,
                isFetching: true,
                imagesDataLoaded: false
            }
        case ShopActionTypes.FETCH_IMAGES_SUCCESS:
            return{
                ...state,
                isFetching: false,
                photos: action.payload,
                imagesDataLoaded: true
            }
        case ShopActionTypes.FETCH_IMAGES_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload,
                imagesDataLoaded: false
            }
        case ShopActionTypes.UPDATE_TOTALS:
            return{
                ...state,
                total: action.payload
            }
        case ShopActionTypes.UPDATE_END:
            return{
                ...state,
                end: action.payload
            }
        case ShopActionTypes.UPDATE_START:
            return{
                ...state,
                start: action.payload
                
            }
        case ShopActionTypes.UPDATE_PAGINATION:
            return{
                ...state,
                start: action.payload.start,
                end: action.payload.end
                
            }
        default:
            return state;
    }

}

export default imagesReducer;