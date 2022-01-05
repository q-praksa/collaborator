import { Action } from 'redux';
import actionTypes from '@reduxStore/actions/actionTypes';

const initialState = {
    type: null,
    show: false,
};

const modalReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return {
                ...state,
                show: true,
            };
        case actionTypes.CLOSE_MODAL:
            return {
                ...state,
                show: false,
            };
        default:
            return state;
    }
};
export default modalReducer;
