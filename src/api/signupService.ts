import apiInstance from '@api/api';
import history from '@components/CustomRouter/history';

type signupType = {
    email: string;
    password: string;
    name: string;
    lastName: string;
};

const signUp = async ({ email, password, name, lastName }: signupType) => {
    try {
        const response = await apiInstance.post('/auth/signup', {
            email: email,
            password: password,
            fullname: name + ' ' + lastName,
        });

        console.log(response.data);
        history.replace('/login');
    } catch (err) {
        console.log(err);
    }
};

export default signUp;
