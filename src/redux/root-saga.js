import {all, call} from 'redux-saga/effects';
import {fetchCollectionsStart} from './shop/shop.saga';
import {fetchImagesStart} from './images/images.saga';

export default function* rootSaga(){
    yield all([call(fetchCollectionsStart),call(fetchImagesStart)]);
}