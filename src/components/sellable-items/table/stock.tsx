import {Badge, Typography} from 'antd';
import {Item} from '@pickk/common';

const {Text} = Typography;

export type SellableItemStockProps = Pick<
  Item,
  'products' | 'isInfiniteStock' | 'isSoldout'
>;

export default function SellableItemStock(props: SellableItemStockProps) {
  const {products, isInfiniteStock} = props;
  const allStocks = products
    .filter((v) => !v.isDeleted)
    .reduce((acc, {stock}) => (acc += stock), 0);
  const badgeColor = getColor(props);

  return (
    <Badge color={badgeColor} offset={[6, 0]}>
      <Text>{isInfiniteStock ? '무한재고' : allStocks}</Text>
    </Badge>
  );
}

function getColor({
  products,
  isInfiniteStock,
  isSoldout,
}: SellableItemStockProps) {
  if (isInfiniteStock) {
    return 'lime';
  }
  const soldoutCount = products.filter(({stock}) => stock <= 0).length;
  if (isSoldout || soldoutCount === products.length) {
    return 'volcano';
  }

  if (soldoutCount >= 1) {
    return 'orange';
  }

  const lackProductCount = products.filter(({stock}) => stock < 5).length;
  if (lackProductCount >= 1) {
    return 'yellow';
  }
  return 'lime';
}
