import { IClients } from '@components/ClientItem/types';
import actionTypes from '@reduxStore/actions/clientActionTypes';
import { removeClient } from '@utils/clients';

const initalState: IClients = {
    clients: [],
};

const clientsReducer = (state = initalState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_CLIENTS: {
            return {
                ...state,
                clients: [...action.payload],
            };
        }
        case actionTypes.DELETE_CLIENT: {
            const newClientsState = removeClient(state.clients, action.payload);
            return {
                ...state,
                clients: [...newClientsState],
            };
        }
        default:
            return state;
    }
};

export default clientsReducer;
