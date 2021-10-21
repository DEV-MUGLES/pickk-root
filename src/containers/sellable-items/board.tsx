import { BoardTemplate } from '@components/common/templates';
import {
  sellableItemsColumns,
  sellableItemsFilterInputs,
} from '@components/sellable-items';

import { useSellableItems } from './hooks';

export default function SellableItemsBoardContainer() {
  return (
    <BoardTemplate
      title="활성 상품관리"
      subTitle="판매 가능한 상품을 관리할 수 있는 메뉴입니다."
      useTableData={useSellableItems}
      columns={sellableItemsColumns}
      filterInputs={sellableItemsFilterInputs}
    />
  );
}
