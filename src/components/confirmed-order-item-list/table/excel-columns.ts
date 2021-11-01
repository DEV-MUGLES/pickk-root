import { ConfirmedOrderItemDataType } from '@containers/confirmed-order-item-list/board/hooks';
import {
  generateExcelColumns,
  getOrderItemClaimStatusDisplayName,
  getOrderItemStatusDisplayName,
  renderDateWithTime,
} from '@src/common/helpers';

import { confirmedOrderItemsTableColumns } from './columns';

export const confirmedOrderItemsExcelColumns =
  generateExcelColumns<ConfirmedOrderItemDataType>(
    confirmedOrderItemsTableColumns,
    {
      paidAt: ({ paidAt }) => renderDateWithTime(paidAt),
      status: ({ status, claimStatus }) =>
        getOrderItemClaimStatusDisplayName(claimStatus) ??
        getOrderItemStatusDisplayName(status, null),
      claimStatus: ({ claimStatus }) =>
        getOrderItemClaimStatusDisplayName(claimStatus),
      paidAmount: ({
        itemFinalPrice,
        shippingFee,
        quantity,
        usedPointAmount,
      }) => itemFinalPrice * quantity + shippingFee - usedPointAmount,
      settlePolicyRate: ({ seller }) => seller?.settlePolicy.rate ?? 70,
      settleAmount: ({ item, shippingFee, quantity, seller }) =>
        Math.floor(
          ((item.sellPrice * quantity + shippingFee) *
            (seller?.settlePolicy.rate ?? 70)) /
            100
        ),
      exchangeRequestShippingFee: ({ exchangeRequest }) =>
        exchangeRequest?.shippingFee ?? '-',
    }
  );
