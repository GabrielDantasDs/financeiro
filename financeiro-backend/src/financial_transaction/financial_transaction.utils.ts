import dayjs from 'dayjs';

export function calcRecurrenceDate(due_date: string | Date, periodicity: number) {
  let date = dayjs(due_date, 'YYYY-MM-DD HH:mm:ss').toDate();

  if (periodicity == 30) {
    date = dayjs(due_date, 'YYYY-MM-DD HH:mm:ss').add(1, 'month').toDate();
  } else {
    date = dayjs(due_date, 'YYYY-MM-DD HH:mm:ss').add(periodicity, 'days').toDate();
  }

  return date;
}
