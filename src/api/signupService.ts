import apiInstance from '@api/api';
import history from '@components/CustomRouter/history';
import { userCredentialsType } from './types';

const signUp = async ({ email, password }: userCredentialsType) => {
    try {
        const response = await apiInstance.post('/auth/signup', {
            email: email,
            password: password,
        });

        console.log(response.data);
        history.replace('/login');
    } catch (err) {
        console.log(err);
    }
};

export default signUp;
