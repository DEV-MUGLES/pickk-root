import { Button, message, Table, Modal } from 'antd';
import { Product } from '@pickk/common';

import StockEditColumn from './stock-edit-column';

import { useToggleIsInfiniteStock } from './hooks';
import { stockColumns } from './columns';

const { confirm } = Modal;

export type StockManageSectionProps = {
  itemId: number;
  isInfiniteStock: boolean;
  products: Array<Product>;
};

function StockManageSection({
  itemId,
  isInfiniteStock,
  products = [],
}: StockManageSectionProps) {
  const { toggleIsInfiniteStock: toggle } = useToggleIsInfiniteStock();

  const [buttonText, confirmText] = !isInfiniteStock
    ? ['전체 무한재고로 설정', '전체 상품을 무한재고로 설정하시겠습니까?']
    : ['전체 무한재고 설정 취소', '전체 상품을 무한재고에서 해제하시겠습니까?'];

  const toggleIsInfiniteStock = (input: boolean) => () => {
    confirm({
      title: confirmText,
      onOk: async () => {
        try {
          await toggle(itemId, input);
          message.success('설정했습니다.');
        } catch (err) {
          message.error('저장에 실패했습니다. err - ' + err);
        }
      },
    });
  };

  const newStockColumns = [
    stockColumns[0],
    {
      title: '재고',
      dataIndex: 'stock',
      key: 'stock',
      render: (value: number, { id }: Product) => (
        <StockEditColumn
          productId={id}
          defaultStock={value}
          isInfiniteStock={isInfiniteStock}
        />
      ),
    },
    ,
    ...stockColumns.slice(1),
  ];

  return (
    <>
      <Button
        style={{ marginBottom: '0.8rem' }}
        onClick={toggleIsInfiniteStock(!isInfiniteStock)}
      >
        {buttonText}
      </Button>
      <Table
        columns={newStockColumns}
        dataSource={[...products]
          .filter(({ isDeleted }) => !isDeleted)
          .sort((a, b) => a.createdAt - b.createdAt)}
      />
    </>
  );
}

export default StockManageSection;
