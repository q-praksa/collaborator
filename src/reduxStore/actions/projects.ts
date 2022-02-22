import { Props } from '@components/ProjectCard/types';
import actionTypes from './projectsActionTypes';

export const getAllProjectsAction = (payload: Props) => {
    return {
        type: actionTypes.GET_PROJECTS,
        payload: payload,
    };
};

export const deleteProjectAction = (id: string) => {
    return {
        type: actionTypes.DELETE_PROJECT,
        payload: id,
    };
};
