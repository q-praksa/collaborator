import { IProjects } from '@components/ProjectCard/types';
import actionTypes from './projectsActionTypes';

export const getAllProjectsAction = (payload: IProjects) => {
    return {
        type: actionTypes.GET_PROJECTS,
        payload: payload,
    };
};
