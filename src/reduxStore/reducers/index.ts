import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';
import modalReducer from '@reduxStore/reducers/modalReducer';
import clientsReducer from '@reduxStore/reducers/clientsReducer';

const allReducers = combineReducers({
    modal: modalReducer,
    count: counterReducer,
    clients: clientsReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
