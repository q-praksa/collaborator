import counterReducer from '@reduxStore/reducers/counterReducer';
import modalReducer from '@reduxStore/reducers/modalReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    count: counterReducer,
    modal: modalReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
