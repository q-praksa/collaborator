export interface ICalendar {
    year: number;
    month: number;
    nextMonth: number;
    nextYear: number;
    previousMonth: number;
    previousYear: number;
    // startingDay:number;
}

export interface IGeneratedDate {
    dates: Date[];
    nextMonth: number;
    nextYear: number;
    previousMonth: number;
    previousYear: number;
    // startingDay:number;
}
