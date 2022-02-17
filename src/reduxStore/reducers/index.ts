import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';
import modalReducer from '@reduxStore/reducers/modalReducer';
import usersReducer from './usersReducer';

const allReducers = combineReducers({
    modal: modalReducer,
    count: counterReducer,
    users: usersReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
