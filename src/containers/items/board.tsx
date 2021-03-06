import { BoardTemplate } from '@components/common/templates';
import { itemsFilterInputs } from '@components/items';

import { useItems, useItemsColumns, useItemsActions } from './hooks';

export default function ItemsBoardContainer() {
  const { itemsColumns } = useItemsColumns();
  const { itemsActions } = useItemsActions();

  return (
    <BoardTemplate
      title="전체상품 관리"
      subTitle="등록된 전체 상품을 조회/수정할 수 있는 메뉴입니다."
      useTableData={useItems}
      columns={itemsColumns}
      filterInputs={itemsFilterInputs}
      actions={itemsActions}
    />
  );
}
