import { BoardTemplate } from '@components/common/templates';
import {
  confirmedOrderItemsTableColumns,
  confirmedOrderItemsExcelColumns,
} from '@components/confirmed-order-item-list';
import { confirmedOrderItemsFilterInputs } from '@components/confirmed-order-item-list';

import { useConfirmedOrderItems } from './hooks';

export default function OrderItemListBoardContainer() {
  return (
    <BoardTemplate
      title="구매확정 주문상품내역"
      subTitle="구매확정된건들만 표시됩니다."
      useTableData={useConfirmedOrderItems}
      columns={confirmedOrderItemsTableColumns}
      excelColumns={confirmedOrderItemsExcelColumns}
      filterInputs={confirmedOrderItemsFilterInputs}
    />
  );
}
