import apiInstance from './api';

export async function getAllProjects() {
    let response;
    try {
        response = await apiInstance.get('/projects');
    } catch (err) {
        console.log('error in getAllProjects');
    }
    return response;
}
