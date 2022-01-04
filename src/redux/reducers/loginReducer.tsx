import { Action } from 'redux';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
};

const loginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };

        default:
            return state;
    }
};

export default loginReducer;
