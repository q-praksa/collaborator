import actionTypes from '@reduxStore/actions/actionTypes';
import { IEmployees } from '@components/EmployeeItem/types';
import { removeUserFromUsersList } from '@utils/employees';

const initialState: IEmployees = {
    users: [],
};

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_USERS: {
            return {
                ...state,
                users: [...action.payload],
            };
        }
        case actionTypes.DELETE_USER: {
            const newUsers = removeUserFromUsersList(
                state.users,
                action.payload
            );
            return {
                ...state,
                users: [...newUsers],
            };
        }
        default:
            return state;
    }
};

export default usersReducer;
