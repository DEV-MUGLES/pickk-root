import { useState } from 'react';

import { BoardTemplate } from '@components/common/template';
import { useSellableItemColumns } from '@components/sellable-item-list';
import {
  CategoryModal,
  ItemPriceManageDrawer,
} from '@components/sellable-item-list/table';

import { useSellableItems } from './hooks';

export default function SellableItemListBoardContainer() {
  const {
    sellableItemColumns,
    selectedRowRecord,
    isCategoryModalVisible,
    isPriceManageVisible,
    onCategoryModalClose,
    onPriceManageClose,
  } = useSellableItemColumns();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <>
      <BoardTemplate
        title="활성상품내역"
        subTitle="활성화된 상품내역을 관리합니다."
        useBoardData={useSellableItems}
        tableColumns={sellableItemColumns}
        selectedRowKeys={selectedRowKeys}
        onRowSelectionChange={setSelectedRowKeys}
      />
      {selectedRowRecord && (
        <CategoryModal
          visible={isCategoryModalVisible}
          itemId={selectedRowRecord.id}
          defaultValue={[
            selectedRowRecord.majorCategory?.id,
            selectedRowRecord.minorCategory?.id,
          ]}
          onClose={onCategoryModalClose}
        />
      )}
      {selectedRowRecord && (
        <ItemPriceManageDrawer
          visible={isPriceManageVisible}
          itemId={selectedRowRecord.id}
          onClose={onPriceManageClose}
        />
      )}
    </>
  );
}
