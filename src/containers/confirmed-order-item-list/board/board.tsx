import { BoardTemplate } from '@components/common/templates';
import { confirmedOrderItemsTableColumns } from '@components/confirmed-order-item-list';
import { confirmedOrderItemsFilterInputs } from '@components/confirmed-order-item-list';

import { useConfirmedOrderItems } from './hooks';

export default function OrderItemListBoardContainer() {
  return (
    <BoardTemplate
      title="주문상품내역"
      subTitle="주문상품내역을 볼 수 있습니다."
      useTableData={useConfirmedOrderItems}
      columns={confirmedOrderItemsTableColumns}
      filterInputs={confirmedOrderItemsFilterInputs}
    />
  );
}
