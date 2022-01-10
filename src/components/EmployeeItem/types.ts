import {
    EmployeeAvailability,
    EmployeeRole,
} from '@components/Employees/types';

export interface IEmployeeItem {
    id: number;
    fullname: string;
    job: string;
    availability: EmployeeAvailability;
    img: string;
    role: EmployeeRole;
}

export interface PropsTypeEmployeeItem {
    employeeItem: IEmployeeItem;
}
