import { useState } from 'react';
import { Button, Space, Table, Modal, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PlusOutlined } from '@ant-design/icons';
import { ItemPrice } from '@pickk/common';

import { useRemoveItemPrice } from './hooks';
import { itemPricesColumns } from './columns';

const { confirm } = Modal;

export type PriceTableSectionProps = {
  itemId: number;
  prices: Array<ItemPrice>;
};

export default function PriceTableSection(props: PriceTableSectionProps) {
  const { itemId, prices } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>();
  const [selectedPriceRecord, setSelectedPriceRecord] =
    useState<ItemPrice>(null);

  const { removeItemPrice } = useRemoveItemPrice();

  const openModal = (isOpen: boolean, type: 'add' | 'edit') => () => {
    setModalVisible(isOpen);
    setModalType(type);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPriceRecord(null);
    setModalType(null);
  };

  const handleEditClick = (price: ItemPrice) => () => {
    setSelectedPriceRecord(price);
    openModal(true, 'edit')();
  };

  const handleDeleteClick = (priceId: number) => () => {
    confirm({
      title: '선택한 가격을 삭제하시겠습니까?',
      onOk: async () => {
        try {
          await removeItemPrice(itemId, priceId);
          message.success('삭제했습니다.');
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    });
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
      {/* {modalVisible && (
        <PriceEditModal
          type={modalType}
          {...props}
          visible={modalVisible}
          onClose={closeModal}
          selectedPriceRecord={selectedPriceRecord}
        />
      )} */}
    </>
  );
}
