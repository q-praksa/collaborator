import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    count: counterReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
