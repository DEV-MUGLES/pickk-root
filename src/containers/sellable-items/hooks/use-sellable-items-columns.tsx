import { useState } from 'react';
import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { sellableItemsColumns } from '@components/sellable-items';

import { useToggleModals } from '@common/hooks';

import { SellableItemDataType } from './use-sellable-items';

const SellableItemsModalTypes = ['size'] as const;
type SellableItemsModalType = typeof SellableItemsModalTypes[number];

export const useSellableItemsColumns = () => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  const { isModalOpen, openModal, closeModal } = useToggleModals(
    SellableItemsModalTypes
  );

  const handleManageButtonClick =
    (itemId: number, types: SellableItemsModalType) => () => {
      setSelectedRowKey(itemId);
      openModal('size');
    };

  const handleModalClose = () => {
    setSelectedRowKey(null);
    closeModal('size');
  };

  const newSellableItemsColumns: ColumnsType<SellableItemDataType> = [
    ...sellableItemsColumns.slice(0, 1),
    {
      title: '관리',
      dataIndex: 'management',
      key: 'management',
      render: (_, record) => (
        <Button
          size="small"
          onClick={handleManageButtonClick(record.id, 'size')}
        >
          사이즈 관리
        </Button>
      ),
      ellipsis: true,
      align: 'center',
    },
    ...sellableItemsColumns.slice(1),
  ];

  return {
    sellableItemsColumns: newSellableItemsColumns,
    selectedRowKey,
    setSelectedRowKey,
    isSizeModalOpen: isModalOpen.size,
    closeSizeModal: handleModalClose,
  };
};
