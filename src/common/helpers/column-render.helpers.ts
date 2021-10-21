import dayjs from 'dayjs';
import { addCommaToNumber } from '.';

export const renderPrice = (value: number) => {
  if (value == null) {
    return '';
  }

  return addCommaToNumber(value) + ' 원';
};

export const renderBoolean = (value: boolean) => {
  if (value == null) {
    return '';
  }

  return value === true ? '✅' : '❌';
};

export const renderDate = (value: Date) => {
  if (!value) {
    return '';
  }

  return dayjs(value).format('YYYY-MM-DD');
};

export const renderDateWithTime = (value: Date) => {
  if (!value) {
    return '';
  }

  return dayjs(value).format('YYYY-MM-DD hh:mm:ss');
};
