import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getItemsById(action) {
    console.log(`we in itemSaga`, action.payload);
    try{
        const response = yield axios.get(`/api/client/list/${action.payload}`)
        yield put ({ type: `SET_CLIENT_SHOPPING_LIST`, payload: response.data })
    }
    catch (error) {
        console.log(error);
    }
}

function* addItem(action) {
    try{
        yield axios.post(`api/client/item/add`, action.payload);
        yield put({ type: `FETCH_ITEM_LIST`,  payload: action.payload.client_id})
    }
    catch (error) {
        console.log(`error in post item`, error);
        
    }
}

function* deleteItem(action) {
    console.log(`we in deleteItem saga`, action.payload);

    try {
        yield axios.delete(`api/client/item/delete/${action.payload.item}`);
        console.log(`we in deleteItem saga`, action.payload);
        yield put({ type: `FETCH_ITEM_LIST`, payload: action.payload.client_id })
    }
    catch (error) {
        console.log(`error in item delete saga`, error);
        
    }
}



function* itemSaga() {
    yield takeLatest(`FETCH_ITEM_LIST`, getItemsById)
    yield takeLatest(`ADD_ITEM`, addItem)
    yield takeLatest('DELETE_ITEM', deleteItem)
}

export default itemSaga;