import { ColumnsType } from 'antd/lib/table';
import { Button, Image } from 'antd';
import { Product } from '@pickk/common';

import { renderBoolean, renderDate, renderPrice } from '@common/helpers';
import { SellableItemDataType } from '@containers/sellable-item-list/hooks';

import ItemStockTitle from './item-stock-title';
import ItemStock from './item-stock';

export const sellableItemColumns: ColumnsType<SellableItemDataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    sorter: (a, b) => b.id - a.id,
  },
  {
    title: '대표이미지',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: 120,
    ellipsis: true,
    align: 'center',
    render: (text) => <Image src={text} alt="상품이미지" />,
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    width: 120,
    align: 'center',
    render: renderPrice,
    sorter: (a, b) => b.originalPrice - a.originalPrice,
  },
  {
    title: '판매가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    width: 120,
    align: 'center',
    render: renderPrice,
    sorter: (a, b) => b.sellPrice - a.sellPrice,
  },
  {
    title: '무한재고여부',
    dataIndex: 'isInfiniteStock',
    key: 'isInfiniteStock',
    width: 100,
    align: 'center',
    render: renderBoolean,
  },
  {
    /** 보유재고 */
    title: ItemStockTitle,
    dataIndex: 'stock',
    key: 'stock',
    width: 100,
    ellipsis: true,
    align: 'center',
    render: (_, { products, isInfiniteStock, isSoldout }) => (
      <ItemStock
        products={products as Array<Product>}
        isInfiniteStock={isInfiniteStock}
        isSoldout={isSoldout}
      />
    ),
  },
  {
    title: 'MD 추천 여부',
    dataIndex: 'isMdRecommended',
    key: 'isMdRecommended',
    width: 120,
    align: 'center',
    render: renderBoolean,
  },
  {
    title: '공홈링크',
    dataIndex: 'urls',
    key: 'urls',
    width: 80,
    align: 'center',
    render: (_, { urls }) => (
      <Button type="link" href={urls.find((url) => url.isPrimary)?.url}>
        상품보기
      </Button>
    ),
  },
  {
    title: '활성전환일',
    dataIndex: 'sellableAt',
    key: 'sellableAt',
    width: 100,
    render: renderDate,
  },
];
