import React from 'react';
import { Collapse, Drawer, DrawerProps, Space } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

import { ActivatedPriceSection } from './sections';
import { useItemPrices } from './hooks';
import { getActivatedPrice } from './helpers';

export type ItemPriceEditDrawerProps = Pick<
  DrawerProps,
  'visible' | 'onClose'
> & {
  itemId: number;
};

function ItemPriceManageDrawer({
  visible,
  onClose,
  itemId,
}: ItemPriceEditDrawerProps) {
  const { data: prices = [] } = useItemPrices(itemId);

  const activatedPrice = getActivatedPrice(prices);

  return (
    <Drawer title="가격관리" visible={visible} onClose={onClose} width={'60%'}>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Collapse defaultActiveKey="1">
          <CollapsePanel key="1" header="적용 중인 가격">
            <ActivatedPriceSection {...activatedPrice} />
          </CollapsePanel>
        </Collapse>
      </Space>
    </Drawer>
  );
}

export default ItemPriceManageDrawer;
