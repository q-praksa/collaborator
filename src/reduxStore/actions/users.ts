import { IEmployees } from '@components/EmployeeItem/types';
import actionTypes from '@reduxStore/actions/actionTypes';

export const getUsersAction = (payload: IEmployees) => {
    return {
        type: actionTypes.GET_USERS,
        payload: payload,
    };
};

export const deleteUserAction = (id: string) => {
    return {
        type: actionTypes.DELETE_USER,
        payload: id,
    };
};
