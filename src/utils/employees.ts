import { IEmployeeItem } from '@components/EmployeeItem/types';

export function employeeExists(
    searchParam: IEmployeeItem,
    filteredEmployees: IEmployeeItem[]
): boolean {
    return filteredEmployees.some((searchBtn) => searchBtn === searchParam);
}

export function findFilters(filters: string[], value: string) {
    return filters.filter((filter) => filter !== value);
}
