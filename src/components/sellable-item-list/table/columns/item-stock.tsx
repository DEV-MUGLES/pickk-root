import { Badge, Typography } from 'antd';
import { Item, Product } from '@pickk/common';

const { Text } = Typography;

export type SellableItemStockProps = Pick<
  Item,
  'products' | 'isInfiniteStock' | 'isSoldout'
>;

function ItemStock({
  products,
  isInfiniteStock,
  isSoldout,
}: SellableItemStockProps) {
  const filteredProducts = products.filter((v) => !v.isDeleted);
  const allStocks = filteredProducts.reduce(
    (acc, { stock }) => (acc += stock),
    0
  );
  const badgeColor = getColor(filteredProducts, isInfiniteStock, isSoldout);

  return (
    <Badge color={badgeColor} offset={[6, 0]}>
      <Text>{isInfiniteStock ? '무한재고' : allStocks}</Text>
    </Badge>
  );
}

export default ItemStock;

function getColor(
  products: Item['products'],
  isInfiniteStock: Item['isInfiniteStock'],
  isSoldout: Item['isSoldout']
) {
  if (isInfiniteStock) {
    return 'lime';
  }

  const soldoutCount = products.filter(({ stock }) => stock <= 0).length;
  if (isSoldout || soldoutCount === products.length) {
    return 'volcano';
  }

  if (soldoutCount >= 1) {
    return 'orange';
  }

  const lackProductCount = products.filter(({ stock }) => stock < 5).length;
  if (lackProductCount >= 1) {
    return 'yellow';
  }
  return 'lime';
}
