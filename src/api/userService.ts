import apiInstance from '@api/api';

export async function getUsers() {
    let response;
    try {
        response = await apiInstance.get('/users');
    } catch (error) {
        console.log(error);
    }
    return response;
}
