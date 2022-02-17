export enum ProjectStatus {
    active = 'active',
    cancelled = 'cancelled',
    inactive = 'inactive',
}

export type Props = {
    status: ProjectStatus;
    client: string;
    lead: string;
    manager: string;
    teamType: string;
    startDate: string;
    endDate: string;
    projectName: string;
    id: number;
};
