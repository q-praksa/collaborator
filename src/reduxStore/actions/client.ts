import { IClients } from '@components/ClientItem/types';
import actionTypes from './clientActionTypes';

export const getAllClientsAction = (payload: IClients) => {
    return {
        type: actionTypes.GET_CLIENTS,
        payload: payload,
    };
};

export const deleteClientAction = (id: string) => {
    return {
        type: actionTypes.DELETE_CLIENT,
        payload: id,
    };
};
