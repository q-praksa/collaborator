export enum ProjectStatus {
    active = 'active',
    cancelled = 'cancelled',
    inactive = 'inactive',
}

export type ProjectsType = {
    status: ProjectStatus;
    clientId: string;
    lead: string;
    manager: string;
    teamType: string;
    startDate: string;
    endDate: string;
    projectName: string;
    id: string;
};

export interface IProjects {
    projects: ProjectsType[];
}
