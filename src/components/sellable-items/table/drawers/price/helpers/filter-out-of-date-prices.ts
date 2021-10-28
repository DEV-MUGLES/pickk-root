import dayjs from 'dayjs';
import {ItemPrice} from '@pickk/common';

export const filterOutOfDatePrices = (prices: Array<ItemPrice>) => {
  return prices.filter(({startAt}) => dayjs(startAt).isAfter(dayjs()));
};
