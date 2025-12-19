import { MonthYear } from '@/types/calendar';

const getDateDetails = (dateValue: string | Date) => {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  return { year, month, day };
};

const getDateWithSeparator = (
  dateValue: string | Date,
  separator: string = '',
) => {
  const { year, month, day } = getDateDetails(dateValue);

  return [
    year,
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
};

const getMonthYearDetails = (initialDate: Date) => {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`);
  const firstDOW = startDate.getDay(); // 0(일요일) ~ 6(토요일)
  const lastDateString = String(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      0,
    ).getDate(),
  );
  const lastDate = Number(lastDateString);

  return { month, year, startDate, firstDOW, lastDate };
};

const getNewMonthYear = (prevData: MonthYear, increment: number) => {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newMonthYear);
};

export type { MonthYear };
export {
  getDateDetails,
  getDateWithSeparator,
  getMonthYearDetails,
  getNewMonthYear,
};
