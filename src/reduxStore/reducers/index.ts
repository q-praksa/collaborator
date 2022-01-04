import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const allReducers = combineReducers({
    count: counterReducer,
    login: loginReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
