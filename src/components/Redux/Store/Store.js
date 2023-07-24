import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk';
import adReducer from '../Reducer/Reducer';

const rootReducer = combineReducers({
    ad: adReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

