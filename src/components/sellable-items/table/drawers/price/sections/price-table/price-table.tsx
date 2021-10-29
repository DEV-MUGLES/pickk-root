import { useState } from 'react';
import { Button, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PlusOutlined } from '@ant-design/icons';
import { ItemPrice } from '@pickk/common';

import { useRemoveItemPrice } from './hooks';
import { itemPricesColumns } from './columns';
import PriceEditModal, { PriceEditModalType } from './price-edit-modal';

export type PriceTableSectionProps = {
  itemId: number;
  prices: Array<ItemPrice>;
  sellerId: number;
};

export default function PriceTableSection(props: PriceTableSectionProps) {
  const { itemId, prices, sellerId } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<PriceEditModalType>();
  const [selectedRecord, setSelectedRecord] = useState<ItemPrice>(null);

  const { removeItemPrice } = useRemoveItemPrice();

  const openModal = (isOpen: boolean, type: PriceEditModalType) => () => {
    setModalVisible(isOpen);
    setModalType(type);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    setModalType(null);
  };

  const handleEditClick = (price: ItemPrice) => () => {
    setSelectedRecord(price);
    openModal(true, 'edit')();
  };

  const handleDeleteClick = (priceId: number) => async () => {
    if (confirm('선택한 가격을 삭제하시겠습니까?')) {
      try {
        await removeItemPrice(itemId, priceId);
        message.success('삭제했습니다.');
      } catch (err) {
        message.error('실패했습니다. err - ' + err);
      }
    }
  };

  const newItemPricesColumns: ColumnsType<ItemPrice> = [
    ...itemPricesColumns,
    {
      title: '가격 설정',
      dataIndex: 'setting',
      key: 'setting',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={handleEditClick(record)}>
            수정
          </Button>
          <Button size="small" onClick={handleDeleteClick(record.id)} danger>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {prices.length > 0 && (
        <Table dataSource={prices} columns={newItemPricesColumns} />
      )}
      <Button icon={<PlusOutlined />} onClick={openModal(true, 'add')}>
        {prices.length > 0 ? '가격 수동설정' : '가격 예약설정'}
      </Button>
      {modalVisible && (
        <PriceEditModal
          type={modalType}
          itemId={itemId}
          sellerId={sellerId}
          prices={prices}
          selectedPriceRecord={selectedRecord}
          visible={modalVisible}
          onClose={closeModal}
        />
      )}
    </>
  );
}
