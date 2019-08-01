import {takeLatest, call, put} from 'redux-saga/effects';
import ShopActionTypes from './images.types';
import { fetchImagesSuccess, fetchImagesFailure, updateTotal, updateEnd} from './images.actions';

export function* getImages(){
   return yield fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response=>response.json())
        .then(data=>{
           return data 
        })
                        
}

export function* fetchImagesAsync(){
    
    try{
        const images = yield call(getImages);
        const total = images.length;
        yield put(updateTotal(total));
       
        yield put(fetchImagesSuccess(images));
    }catch(error){
        yield put(fetchImagesFailure(error.message));
    }
}

export function* fetchImagesStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_IMAGES_START,
        fetchImagesAsync    
    )
}