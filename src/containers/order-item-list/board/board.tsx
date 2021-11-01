import { BoardTemplate } from '@components/common/templates';
import {
  orderItemsTableColumns,
  orderItemsFilterInputs,
} from '@components/order-item-list';

import { useOrderItems } from './hooks';

export default function ConfirmedOrderItemListBoardContainer() {
  return (
    <BoardTemplate
      title="주문상품내역"
      subTitle="주문상품내역을 볼 수 있습니다."
      useTableData={useOrderItems}
      columns={orderItemsTableColumns}
      filterInputs={orderItemsFilterInputs}
    />
  );
}
