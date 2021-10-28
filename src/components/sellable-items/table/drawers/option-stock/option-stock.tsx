import { ReactNode } from 'react';
import { Collapse, Drawer, DrawerProps, Space } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { ItemOption, Product } from '@pickk/common';

import { OptionManageSection, StockManageSection } from './sections';

import { useItemOptions, useItemProducts } from './hooks';

const SectionWrapper = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <Collapse defaultActiveKey="1">
    <CollapsePanel key="1" header={title}>
      {' '}
      {children}{' '}
    </CollapsePanel>
  </Collapse>
);

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
        <SectionWrapper title="옵션 관리">
          <OptionManageSection
            itemId={itemId}
            options={options as ItemOption[]}
          />
        </SectionWrapper>
        <SectionWrapper title="재고 관리">
          <StockManageSection
            itemId={itemId}
            isInfiniteStock={isInfiniteStock}
            products={products as Product[]}
          />
        </SectionWrapper>
      </Space>
    </Drawer>
  );
}
