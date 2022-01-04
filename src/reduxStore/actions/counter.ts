import actionTypes from '@reduxStore/actions/actionTypes';

export const add = () => {
    return {
        type: actionTypes.ADD,
    };
};

export const sub = () => {
    return {
        type: actionTypes.SUB,
    };
};
