import { BoardFilterInputType } from '@components/common/organisms/board-filter';
import { orderItemsFilterInputs } from '@components/order-item-list';

import ConfirmedAtBetweenDatePicker from './confirmed-at-between';

export const confirmedOrderItemsFilterInputs: BoardFilterInputType[] = [
  ...orderItemsFilterInputs,
  {
    name: 'confirmedAtBetween',
    label: '구매확정일시',
    Component: ConfirmedAtBetweenDatePicker,
  },
];
