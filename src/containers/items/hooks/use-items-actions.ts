import { Key } from 'react';
import { message } from 'antd';

import { TableActionType } from '@components/common/organisms/board-table/actions';

import { useBulkUpdateIsSellable } from '@components/items/table';

export const useItemsActions = () => {
  const { bulkUpdateIsSellable } = useBulkUpdateIsSellable();

  const itemsActions: TableActionType[] = [
    {
      text: '상품 활성화',
      onClick: async (selectedIds: Key[]) => {
        try {
          if (confirm('상품을 활성화 하시겠습니까?')) {
            await bulkUpdateIsSellable(selectedIds as number[], true);
            return true;
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
    {
      text: '상품 비활성화',
      onClick: async (selectedIds: Key[]) => {
        try {
          if (confirm('상품을 비활성화 하시겠습니까?')) {
            await bulkUpdateIsSellable(selectedIds as number[], false);
            return true;
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
  ];

  return { itemsActions };
};
