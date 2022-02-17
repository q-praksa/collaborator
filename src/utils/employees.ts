import { IEmployeeItem } from '@components/EmployeeItem/types';

export function employeeExists(
    searchParam: IEmployeeItem,
    filteredEmployees: IEmployeeItem[] | null
): boolean | undefined {
    return filteredEmployees?.some((searchBtn) => searchBtn === searchParam);
}

export function findFilters(filters: string[], value: string) {
    return filters.filter((filter) => filter !== value);
}

export function removeUserFromUsersList(users: IEmployeeItem[], id: string) {
    const filterUsers = users.filter((user) => user.id !== id);
    return filterUsers;
}
