import { EmployeeStatus, EmployeeRole } from '@components/Employees/types';

export interface IEmployeeItem {
    id: string;
    fullname: string;
    job: string;
    status: EmployeeStatus;
    img: string;
    role: EmployeeRole;
}

export interface PropsTypeEmployeeItem {
    employeeItem: IEmployeeItem;
}

export interface IEmployees {
    users: IEmployeeItem[];
}
