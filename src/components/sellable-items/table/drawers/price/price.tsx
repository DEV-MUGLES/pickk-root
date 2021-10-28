import React from 'react';
import { Drawer, DrawerProps, Space } from 'antd';

import { stringSorter } from '@common/helpers';

import { ActivatedPriceSection, PriceTableSection } from './sections';

import { filterOutOfDatePrices, getActivatedPrice } from './helpers';
import { useItemPrices } from './hooks';
import { Accordion } from '@components/common/molecules';

export type ItemPriceEditDrawerProps = Pick<
  DrawerProps,
  'visible' | 'onClose'
> & {
  itemId: number;
  sellerId: number;
};

function ItemPriceManageDrawer({
  visible,
  onClose,
  itemId,
  sellerId,
}: ItemPriceEditDrawerProps) {
  const { data: item } = useItemPrices(itemId);
  const prices = item?.prices || [];

  /** 연동가 제외, 현재 시점 이후의 가격을 오래된 순으로 정렬한다. */
  const filteredPrices = filterOutOfDatePrices(prices)
    .filter((v) => !v.isBase)
    .sort((a, b) => stringSorter(a.startAt, b.startAt));

  return (
    <Drawer title="가격관리" visible={visible} onClose={onClose} width={'60%'}>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <Accordion title="적용 중인 가격">
          <ActivatedPriceSection
            {...item}
            isBase={getActivatedPrice(prices)?.isBase}
          />
        </Accordion>
        <Accordion title="가격 수동 설정">
          <PriceTableSection
            itemId={itemId}
            prices={filteredPrices}
            sellerId={sellerId}
          />
        </Accordion>
      </Space>
    </Drawer>
  );
}

export default ItemPriceManageDrawer;
