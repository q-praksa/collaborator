import { Action } from 'redux';
import actionTypes from '@reduxStore/actions/actionTypes';
import { modalTypes } from '@reduxStore/actions/modalTypes';

const initialState = {
    type: {
        addNewClient: false,
        addNewTimesheetItem: false,
        addNewSkill: false,
        addNewEmployee: false,
    },
};

const modalReducer = (
    state = initialState,
    action: Action & { payload: { type: modalTypes } }
) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL: {
            return {
                ...state,
                type: {
                    ...state.type,
                    [action.payload.type]: true,
                },
            };
        }
        case actionTypes.CLOSE_MODAL: {
            return {
                ...state,
                type: {
                    ...state.type,
                    [action.payload.type]: false,
                },
            };
        }
        default:
            return state;
    }
};
export default modalReducer;
