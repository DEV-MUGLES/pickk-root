import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ItemPrice } from '@pickk/common';

import { renderDate, renderPrice } from '@common/helpers';

export const itemPricesColumns: ColumnsType<ItemPrice> = [
  {
    title: '설정 여부',
    dataIndex: 'isBase',
    key: 'isBase',
    render: (_, { isActive }) => isActive && <Tag color="volcano">적용중</Tag>,
  },
  {
    title: '기간',
    dataIndex: 'range',
    key: 'range',
    render: (_, { startAt, endAt }) =>
      `${renderDate(startAt)} ~ ${renderDate(endAt)}`,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: renderPrice,
  },
  {
    title: '판매가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    render: renderPrice,
  },
];
