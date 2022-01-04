import { Action } from 'redux';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
};

const loginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            state.isLoggedIn = true;
            console.log(state);
            return Object.assign({}, state);

        default:
            return state;
    }
};

export default loginReducer;
