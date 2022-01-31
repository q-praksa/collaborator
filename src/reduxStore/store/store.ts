import allReducers from '@reduxStore/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(allReducers, composedEnhancer);

export default store;
