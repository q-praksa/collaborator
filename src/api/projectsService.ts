import apiInstance from './api';
import { projectPayloadType } from './types';

export async function getAllProjects() {
    let response;
    try {
        response = await apiInstance.get('/projects');
    } catch (err) {
        console.log('error in getAllProjects');
    }
    return response;
}

export const addNewProject = async (payload: projectPayloadType) => {
    let response;
    try {
        response = await apiInstance.post('/projects/', payload);
    } catch (error) {
        console.log(error);
    }
    return response;
};
