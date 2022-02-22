import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';
import modalReducer from '@reduxStore/reducers/modalReducer';
import clientsReducer from '@reduxStore/reducers/clientsReducer';
import usersReducer from './usersReducer';
import projectsReducer from './projectsReducer';

const allReducers = combineReducers({
    modal: modalReducer,
    count: counterReducer,
    clients: clientsReducer,
    users: usersReducer,
    projects: projectsReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
