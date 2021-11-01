import { ConfirmedRefundRequestDataType } from '@containers/completed-refund-request-list/board/hooks';
import { generateExcelColumns, renderDateWithTime } from '@src/common/helpers';

import { completedRefundRequestsTableColumns } from './columns';

export const completedRefundRequestsExcelColumns =
  generateExcelColumns<ConfirmedRefundRequestDataType>(
    completedRefundRequestsTableColumns,
    {
      orderItemsMerchantUid: ({ orderItems }) =>
        orderItems.map((v) => v.merchantUid).join(', '),
      orderPaidAt: ({ order }) => renderDateWithTime(order?.paidAt),
      requestedAt: ({ requestedAt }) => renderDateWithTime(requestedAt),
      confirmedAt: ({ confirmedAt }) => renderDateWithTime(confirmedAt),
      orderItemBrandNameKor: ({ orderItems }) => orderItems[0].brandNameKor,
    }
  );
