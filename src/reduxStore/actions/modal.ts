import actionTypes from '@reduxStore/actions/actionTypes';
import { modalTypes } from '@reduxStore/actions/modalTypes';

export const open = (modalType: modalTypes) => {
    return {
        type: actionTypes.OPEN_MODAL,
        payload: {
            type: modalType,
        },
    };
};
export const close = (modalType: modalTypes) => {
    return {
        type: actionTypes.CLOSE_MODAL,
        payload: {
            type: modalType,
        },
    };
};
