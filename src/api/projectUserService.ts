import apiInstance from './api';
import { projectUserPayloadType } from './types';

export const addProjectUser = async (
    payload: projectUserPayloadType,
    projectId: string
) => {
    let response;
    try {
        response = await apiInstance.post(
            `/projects/${projectId}/users`,
            payload
        );
    } catch (error) {
        console.log(error);
    }
    return response;
};
