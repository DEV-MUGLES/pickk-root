import { ColumnsType } from 'antd/lib/table';
import { Button, Image, Typography, Badge, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { palette } from '@pickk/design-token';
import { Product } from '@pickk/common';

import { renderBoolean, renderDate, renderPrice } from '@src/common/helpers';

import { SellableItemDataType } from '@containers/sellable-items/hooks';

import SellableItemStock from './stock';

const { Text } = Typography;

export const sellableItemsColumns: ColumnsType<SellableItemDataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
  },
  {
    title: '대표이미지',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: 120,
    render: (value) => <Image src={value} alt="대표이미지" />,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '브랜드',
    dataIndex: 'brandNameKor',
    key: 'brandNameKor',
    width: 100,
    render: (_, { brand }) => brand.nameKor,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    width: 120,
    align: 'center',
    render: renderPrice,
  },
  {
    title: '판매가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    width: 120,
    align: 'center',
    render: renderPrice,
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
    title: ItemStockColumnTitle,
    dataIndex: 'stock',
    key: 'stock',
    width: 100,
    align: 'center',
    render: (_, { products, isInfiniteStock, isSoldout }) => (
      <SellableItemStock
        products={products as Array<Product>}
        isInfiniteStock={isInfiniteStock}
        isSoldout={isSoldout}
      />
    ),
    ellipsis: true,
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
    render: renderDate,
    width: 120,
  },
];

export function ItemStockColumnTitle() {
  return (
    <Text>
      보유재고
      <Tooltip
        placement="right"
        title={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.4rem',
            }}
          >
            <Badge color="lime" text="재고 충분 (무한재고)" />
            <Badge color="yellow" text="재고가 5개 미만인 옵션 존재" />
            <Badge color="orange" text="옵션 1개 이상 품절" />
            <Badge color="volcano" text="재고 전체 품절" />
          </div>
        }
        color={palette.white}
      >
        <InfoCircleOutlined
          style={{ color: palette.gray4, marginLeft: '0.2rem' }}
        />
      </Tooltip>
    </Text>
  );
}
