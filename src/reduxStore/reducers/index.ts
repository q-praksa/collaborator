import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';
import modalReducer from '@reduxStore/reducers/modalReducer';
import clientsReducer from '@reduxStore/reducers/clientsReducer';
import usersReducer from './usersReducer';

const allReducers = combineReducers({
    modal: modalReducer,
    count: counterReducer,
    clients: clientsReducer,
    users: usersReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
