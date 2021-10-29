import { ColumnsType } from 'antd/lib/table';
import { Product } from '@pickk/common';

import { renderDate, addCommaToNumber } from '@src/common/helpers';

export const stockColumns: ColumnsType<Product> = [
  {
    title: '프로덕트',
    dataIndex: 'product',
    key: 'product',
    render: (_, { itemOptionValues }) => {
      return [...itemOptionValues]
        .sort((a, b) => a.itemOptionId - b.itemOptionId)
        .map(({ name }) => name)
        .join(', ');
    },
  },
  {
    title: '옵션별 추가금',
    dataIndex: 'priceVariant',
    key: 'priceVariant',
    render: (value) => addCommaToNumber(value) + ' 원',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    defaultSortOrder: 'ascend',
    render: renderDate,
  },
  {
    title: '최근 수정일',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: renderDate,
  },
];
