import { ProjectsType } from '@components/ProjectCard/types';

export function removeProjectFromProjectsList(
    projects: ProjectsType[],
    id: string
) {
    const filterProjects = projects.filter((project) => project.id !== id);
    return filterProjects;
}
