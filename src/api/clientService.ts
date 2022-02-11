import apiInstance from '@api/api';
import { clientPayloadType } from './types';

export const addNewClient = async (payload: clientPayloadType) => {
    let response;
    try {
        response = await apiInstance.post('/clients/', payload);
    } catch (error) {
        console.log(error);
    }
};

export const getAllClients = async () => {
    let response;
    try {
        response = await apiInstance.get('/clients/');
    } catch (error) {
        console.log(error);
    }
    return response;
};

export const updateClient = async (payload: clientPayloadType) => {
    // let response;
    try {
        console.log('Before response', payload);
        await apiInstance.patch('/clients/', payload);
    } catch (error) {
        console.log(error);
    }
    // return response;
};

export const getClientById = async (id: string | undefined) => {
    let response;
    try {
        response = await apiInstance.get(`/clients/${id}`);
    } catch (error) {
        console.log(error);
    }
    return response;
};
