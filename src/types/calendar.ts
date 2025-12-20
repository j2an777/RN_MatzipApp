interface MonthYear {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
}

interface CalendarPost {
  id: number;
  title: string;
  address: string;
}

type ResponseCalendarPost = Record<number, CalendarPost[]>;

export type { MonthYear, CalendarPost, ResponseCalendarPost };
