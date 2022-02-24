import actionTypes from '@reduxStore/actions/projectsActionTypes';
import { IProjects } from '@components/ProjectCard/types';
import { removeProjectFromProjectsList } from '@utils/projects';

const initialState: IProjects = {
    projects: [],
};

const projectsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_PROJECTS: {
            return {
                ...state,
                projects: [...action.payload],
            };
        }
        case actionTypes.DELETE_PROJECT: {
            const newProjects = removeProjectFromProjectsList(
                state.projects,
                action.payload
            );
            return {
                ...state,
                projects: [...newProjects],
            };
        }
        default:
            return state;
    }
};

export default projectsReducer;
