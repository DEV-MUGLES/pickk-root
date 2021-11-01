import { OrderItemDataType } from '@containers/order-item-list/board/hooks';
import {
  generateExcelColumns,
  addDashToPhoneNumber,
  getOrderItemClaimStatusDisplayName,
  getOrderItemStatusDisplayName,
  renderDateWithTime,
} from '@src/common/helpers';

import { orderItemsTableColumns } from './columns';

export const orderItemsExcelColumns = generateExcelColumns<OrderItemDataType>(
  orderItemsTableColumns,
  {
    createdAt: ({ createdAt }) => renderDateWithTime(createdAt),
    paidAt: ({ paidAt }) => renderDateWithTime(paidAt),
    confirmedAt: ({ confirmedAt }) => renderDateWithTime(confirmedAt),
    status: ({ status, isConfirmed }) =>
      getOrderItemStatusDisplayName(status, isConfirmed),
    claimStatus: ({ claimStatus }) =>
      getOrderItemClaimStatusDisplayName(claimStatus),
    buyerName: ({ order }) => order?.buyer?.name,
    buyerPhoneNumber: ({ order }) =>
      addDashToPhoneNumber(order?.buyer?.phoneNumber),
    receiverReceiverName: ({ order }) => order?.receiver?.receiverName,
  }
);
