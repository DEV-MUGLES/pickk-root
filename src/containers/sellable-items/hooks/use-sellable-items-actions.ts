import { Key } from 'react';
import { message } from 'antd';

import { TableActionType } from '@components/common/organisms/board-table/actions';
import { useBulkUpdateIsMdRecommended } from '@components/sellable-items';
import { useBulkUpdateIsSellable } from '@components/items';

export const useSellableItemsActions = () => {
  const { bulkUpdateIsMdRecommended } = useBulkUpdateIsMdRecommended();
  const { bulkUpdateIsSellable } = useBulkUpdateIsSellable();

  const sellableItemsActions: TableActionType[] = [
    {
      text: 'MD추천 ON',
      onClick: async (selectedIds: Key[]) => {
        try {
          if (confirm('MD 추천 상품으로 설정합니다.')) {
            await bulkUpdateIsMdRecommended(selectedIds as number[], true);
            return true;
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
    {
      text: 'MD추천 OFF',
      onClick: async (selectedIds: Key[]) => {
        try {
          if (confirm('MD 추천 상품을 해제합니다.')) {
            await bulkUpdateIsMdRecommended(selectedIds as number[], false);
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

  return { sellableItemsActions };
};
