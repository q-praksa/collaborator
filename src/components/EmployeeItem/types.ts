import { EmployeeStatus, EmployeeRole } from '@components/Employees/types';

export interface IEmployeeItem {
    id: number;
    fullname: string;
    job: string;
    status: EmployeeStatus;
    img: string;
    role: EmployeeRole;
}

export interface PropsTypeEmployeeItem {
    employeeItem: IEmployeeItem;
}
