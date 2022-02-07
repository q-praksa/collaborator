import apiInstance from '@api/api';
import jwt from 'jwt-decode';
import { userPayloadType, userTokenType } from './types';

export async function getUsers() {
    let response;
    try {
        response = await apiInstance.get('/users');
    } catch (error) {
        console.log(error);
    }
    return response;
}

export async function getUserByToken(token: string) {
    let response;
    const user: userTokenType = jwt(token);
    try {
        response = await apiInstance.get(`/users/${user.userId}`);
    } catch (error) {
        console.log(error);
    }
    return response;
}

export async function updateUser(payload: userPayloadType) {
    let response;
    try {
        response = await apiInstance.patch('/users/', payload);
    } catch (error) {
        console.log(error);
    }
    return response;
}
