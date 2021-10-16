import React from 'react';
import { Collapse, Drawer, DrawerProps, Space } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

import { stringSorter } from '@common/helpers';

import { ActivatedPriceSection, PriceTableSection } from './sections';

import { filterOutOfDatePrices, getActivatedPrice } from './helpers';
import { useItemPrices } from './hooks';

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

  /** @TODO 올바르게 필터링 되었는지 확인 */
  /** 연동가 제외, 현재 시점 이후의 가격을 오래된 순으로 정렬한다. */
  const filteredPrices = filterOutOfDatePrices(prices)
    .filter((v) => !v.isBase)
    .sort((a, b) => stringSorter(a.startAt, b.startAt));

  return (
    <Drawer title="가격관리" visible={visible} onClose={onClose} width={'60%'}>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Collapse defaultActiveKey="1">
          <CollapsePanel key="1" header="적용 중인 가격">
            <ActivatedPriceSection {...getActivatedPrice(prices)} />
          </CollapsePanel>
        </Collapse>
        <Collapse defaultActiveKey="1">
          <CollapsePanel key="1" header="가격 수동 설정">
            <PriceTableSection itemId={itemId} prices={filteredPrices} />
          </CollapsePanel>
        </Collapse>
      </Space>
    </Drawer>
  );
}

export default ItemPriceManageDrawer;
