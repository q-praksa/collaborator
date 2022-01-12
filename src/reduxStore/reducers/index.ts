import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';
import modalReducer from '@reduxStore/reducers/modalReducer';

const allReducers = combineReducers({
    modal: modalReducer,
    count: counterReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
