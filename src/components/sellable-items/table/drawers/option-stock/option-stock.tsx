import { Drawer, DrawerProps, Space } from 'antd';
import { ItemOption, Product } from '@pickk/common';

import { Accordion } from '@components/common/molecules';

import { OptionManageSection, StockManageSection } from './sections';

import { useItemOptions, useItemProducts } from './hooks';

export type ItemOptionStockEditDrawerProps = Pick<
  DrawerProps,
  'visible' | 'onClose'
> & {
  itemId: number;
};

export default function ItemOptionStockManageDrawer({
  visible,
  onClose,
  itemId,
}: ItemOptionStockEditDrawerProps) {
  const { options } = useItemOptions(itemId);
  const { products, isInfiniteStock } = useItemProducts(itemId);

  return (
    <Drawer
      title="옵션/재고 관리"
      visible={visible}
      onClose={onClose}
      width={'60%'}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Accordion title="옵션 관리">
          <OptionManageSection
            itemId={itemId}
            options={options as ItemOption[]}
          />
        </Accordion>
        <Accordion title="재고 관리">
          <StockManageSection
            itemId={itemId}
            isInfiniteStock={isInfiniteStock}
            products={products as Product[]}
          />
        </Accordion>
      </Space>
    </Drawer>
  );
}
