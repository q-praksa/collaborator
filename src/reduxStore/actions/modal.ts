import actionTypes from '@reduxStore/actions/actionTypes';
import modalTypes from '@reduxStore/actions/modalTypes';
export const open = () => {
    return {
        type: actionTypes.OPEN_MODAL,
        payload: {
            type: modalTypes.ADD_NEW_SKILL,
        },
    };
};
export const close = () => {
    return {
        type: actionTypes.CLOSE_MODAL,
        payload: {
            type: modalTypes.ADD_NEW_SKILL,
        },
    };
};
