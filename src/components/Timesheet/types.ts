export interface ICalendar {
    year: number;
    month: number;
    nextMonth: number;
    nextYear: number;
    previousMonth: number;
    previousYear: number;
}

export interface IGeneratedDate {
    dates: Date[];
    nextMonth: number;
    nextYear: number;
    previousMonth: number;
    previousYear: number;
}

export type TimesheetDate = {
    date?: string | React.ReactNode;
    month: string;
};
