import apiInstance from '@api/api';
import history from '@components/CustomRouter/history';

const getRefreshToken = async () => {
    let response;
    try {
        response = await apiInstance.post('/auth/token', {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        });
    } catch (err) {
        console.log(err);
    }
    if (response?.status === 200) {
        const data = await response.data;
        localStorage.setItem('accessToken', data.accessToken);
    } else {
        history.replace('/login');
    }
};

export default getRefreshToken;
