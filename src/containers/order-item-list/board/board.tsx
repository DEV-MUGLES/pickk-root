import { BoardTemplate } from '@components/common/template';
import {
  orderItemsTableColumns,
  orderItemsFilterInputs,
} from '@components/order-item-list';

import { useOrderItems } from './hooks';

export default function OrderItemListBoardContainer() {
  return (
    <BoardTemplate
      title="주문상품내역"
      subTitle="주문상품내역을 볼 수 있습니다."
      useBoardData={useOrderItems}
      tableColumns={orderItemsTableColumns}
      filterInputs={orderItemsFilterInputs}
    />
  );
}
