import { IProjects } from '@components/ProjectCard/types';
import actionTypes from '@reduxStore/actions/projectsActionTypes';

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
        default:
            return state;
    }
};

export default projectsReducer;
