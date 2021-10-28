import { BoardTemplate } from '@components/common/templates';
import { itemsFilterInputs } from '@components/items';
import {
  ItemSizeChartDrawer,
  ItemOptionStockManageDrawer,
} from '@components/sellable-items/table/drawers';

import {
  useSellableItems,
  useSellableItemsColumns,
  useSellableItemsActions,
} from './hooks';

export default function SellableItemsBoardContainer() {
  const {
    sellableItemsColumns,
    selectedRowKey,
    isSizeModalOpen,
    isOptionStockModalOpen,
    closeSizeModal,
    closeOptionStockModal,
  } = useSellableItemsColumns();
  const { sellableItemsActions } = useSellableItemsActions();

  return (
    <>
      <BoardTemplate
        title="활성 상품관리"
        subTitle="판매 가능한 상품을 관리할 수 있는 메뉴입니다."
        useTableData={useSellableItems}
        columns={sellableItemsColumns}
        filterInputs={itemsFilterInputs}
        actions={sellableItemsActions}
      />
      {!!selectedRowKey && (
        <ItemOptionStockManageDrawer
          itemId={selectedRowKey}
          visible={isOptionStockModalOpen}
          onClose={closeOptionStockModal}
        />
      )}
      {!!selectedRowKey && (
        <ItemSizeChartDrawer
          itemId={selectedRowKey}
          visible={isSizeModalOpen}
          onClose={closeSizeModal}
        />
      )}
    </>
  );
}
