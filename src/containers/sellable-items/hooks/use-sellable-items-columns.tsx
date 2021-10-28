import { useState } from 'react';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { CategoryRenderer } from '@components/items';
import { sellableItemsColumns } from '@components/sellable-items';

import { useToggleModals } from '@common/hooks';

import { SellableItemDataType } from './use-sellable-items';

const SellableItemsModalTypes = ['size', 'optionStock', 'price'] as const;
type SellableItemsModalType = typeof SellableItemsModalTypes[number];

export const useSellableItemsColumns = () => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  const { isModalOpen, openModal, closeModal } = useToggleModals(
    SellableItemsModalTypes
  );

  const handleManageButtonClick =
    (itemId: number, types: SellableItemsModalType) => () => {
      setSelectedRowKey(itemId);
      openModal(types);
    };

  const handleModalClose = (types: SellableItemsModalType) => () => {
    setSelectedRowKey(null);
    closeModal(types);
  };

  const newSellableItemsColumns: ColumnsType<SellableItemDataType> = [
    ...sellableItemsColumns.slice(0, 1),
    {
      title: '관리',
      dataIndex: 'management',
      key: 'management',
      render: (_, record) => (
        <Space direction="vertical">
          <Button
            size="small"
            onClick={handleManageButtonClick(record.id, 'optionStock')}
          >
            옵션/재고 관리
          </Button>
          <Button
            size="small"
            onClick={handleManageButtonClick(record.id, 'size')}
          >
            사이즈 관리
          </Button>
        </Space>
      ),
      ellipsis: true,
      align: 'center',
    },
    ...sellableItemsColumns.slice(1, 2),
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      render: (_, props) => <CategoryRenderer {...props} />,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    ...sellableItemsColumns.slice(2),
  ];

  return {
    sellableItemsColumns: newSellableItemsColumns,
    selectedRowKey,
    setSelectedRowKey,
    isOptionStockModalOpen: isModalOpen.optionStock,
    isSizeModalOpen: isModalOpen.size,
    closeOptionStockModal: handleModalClose('optionStock'),
    closeSizeModal: handleModalClose('size'),
  };
};
