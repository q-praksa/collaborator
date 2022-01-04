import allReducers from '@reduxStore/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhancer = composeWithDevTools(applyMiddleware());

const store = createStore(allReducers, composedEnhancer);

export default store;
