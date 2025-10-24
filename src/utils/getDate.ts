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

export { getDateDetails, getDateWithSeparator };
