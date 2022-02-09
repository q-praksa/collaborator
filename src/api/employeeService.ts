import apiInstance from '@api/api';
import { employeePayloadType } from './types';

export const addNewEmployee = async (payload: employeePayloadType) => {
    let response;
    try {
        response = await apiInstance.post('/users/', payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
