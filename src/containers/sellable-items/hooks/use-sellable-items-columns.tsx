import { useState } from 'react';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { CategoryRenderer } from '@components/items';
import { sellableItemsColumns } from '@components/sellable-items';

import { useToggleModals } from '@common/hooks';

import { SellableItemDataType } from './use-sellable-items';

const SellableItemsModalTypes = [
  'size',
  'optionStock',
  'price',
  'info',
] as const;
type SellableItemsModalType = typeof SellableItemsModalTypes[number];

export const useSellableItemsColumns = () => {
  const [selectedRecord, setSelectedRecord] =
    useState<SellableItemDataType>(null);

  const { isModalOpen, openModal, closeModal } = useToggleModals(
    SellableItemsModalTypes
  );

  const handleManageButtonClick =
    (record: SellableItemDataType, types: SellableItemsModalType) => () => {
      setSelectedRecord(record);
      openModal(types);
    };

  const handleModalClose = (types: SellableItemsModalType) => () => {
    setSelectedRecord(null);
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
            onClick={handleManageButtonClick(record, 'price')}
          >
            가격 관리
          </Button>
          <Button
            size="small"
            onClick={handleManageButtonClick(record, 'optionStock')}
          >
            옵션/재고 관리
          </Button>
          <Button
            size="small"
            onClick={handleManageButtonClick(record, 'size')}
          >
            사이즈 관리
          </Button>
          <Button
            size="small"
            onClick={handleManageButtonClick(record, 'info')}
          >
            정보 수정
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
    selectedRecord,
    isPriceModalOpen: isModalOpen.price,
    isOptionStockModalOpen: isModalOpen.optionStock,
    isSizeModalOpen: isModalOpen.size,
    isInfoModalOpen: isModalOpen.info,
    closePriceModal: handleModalClose('price'),
    closeOptionStockModal: handleModalClose('optionStock'),
    closeSizeModal: handleModalClose('size'),
    closeInfoModal: () => closeModal('info'),
  };
};
