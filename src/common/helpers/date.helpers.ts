import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const isSameDate = (a: dayjs.ConfigType, b: dayjs.ConfigType) =>
  dayjs(a).isSame(dayjs(b), 'd');
export const isBeforeDate = (a: dayjs.ConfigType, b: dayjs.ConfigType) =>
  dayjs(a).isBefore(dayjs(b), 'd');

export const compareDate = (a: dayjs.ConfigType, b: dayjs.ConfigType) => {
  if (isSameDate(a, b)) {
    return 0;
  } else if (isBeforeDate(a, b)) {
    return -1;
  } else {
    return 1;
  }
};

export const isDateIncluded = (
  date: dayjs.ConfigType,
  from: dayjs.ConfigType,
  to: dayjs.ConfigType
) => dayjs(date).isBetween(dayjs(from), dayjs(to), 'd', '[]');

// set Date time to 00:00:00
export const setStartOfDay = (date: dayjs.ConfigType) => {
  return dayjs(date).startOf('day');
};

// set Date time to 23:59:59
export const setEndOfDay = (date: dayjs.ConfigType) => {
  return dayjs(date).endOf('day');
};
