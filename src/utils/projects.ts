import { Props } from '@components/ProjectCard/types';

export function removeProjectFromProjectsList(projects: Props[], id: string) {
    const filterProjects = projects.filter((project) => project.id !== id);
    return filterProjects;
}
