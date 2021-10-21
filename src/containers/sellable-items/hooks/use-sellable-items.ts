import { gql, useQuery } from '@apollo/client';
import {
  Item,
  ItemFilter,
  QueryMeSellerItemsArgs,
  ItemUrl,
  ItemCategory,
  Product,
  PageInput,
  Brand,
} from '@pickk/common';

import { BoardTableDataFetcher } from '@components/common/organisms/board-table';
import { useSellableItemsCount } from './use-sellable-items-count';

const GET_SELLABLE_ITEMS = gql`
  query items($itemFilter: ItemFilter, $pageInput: PageInput) {
    items(itemFilter: $itemFilter, pageInput: $pageInput) {
      id
      imageUrl
      name
      originalPrice
      sellPrice
      finalPrice
      isInfiniteStock
      isSoldout
      isMdRecommended
      isSellable
      createdAt
      sellableAt
      brand {
        id
        nameKor
      }
      urls {
        id
        isPrimary
        url
      }
      majorCategory {
        id
        name
      }
      minorCategory {
        id
        name
      }
      products {
        id
        stock
        isDeleted
      }
    }
  }
`;

export type SellableItemDataType = Pick<
  Item,
  | 'id'
  | 'imageUrl'
  | 'name'
  | 'originalPrice'
  | 'sellPrice'
  | 'finalPrice'
  | 'isInfiniteStock'
  | 'isSoldout'
  | 'isMdRecommended'
  | 'isSellable'
  | 'createdAt'
  | 'sellableAt'
> & {
  brand: Pick<Brand, 'id' | 'nameKor'>;
  urls: Array<Pick<ItemUrl, 'id' | 'isPrimary' | 'url'>>;
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
  products: Array<Pick<Product, 'id' | 'stock' | 'isDeleted'>>;
};

const formatItemFilter = (
  filter: ItemFilter & { category?: [number, number] }
) => {
  const result = {
    ...filter,
    ...(filter['category']
      ? {
          majorCategoryId: filter['category'][0],
          minorCategoryId: filter['category'][1],
        }
      : {}),
  };

  delete result['category'];

  return result;
};

export const useSellableItems: BoardTableDataFetcher<
  SellableItemDataType,
  ItemFilter & { category?: [number, number] }
> = ({ filter, pageInput }) => {
  const itemFilter: ItemFilter = {
    ...formatItemFilter(filter),
    isSellable: true,
  };

  const { data, loading, refetch } = useQuery<
    { items: SellableItemDataType[] },
    { itemFilter: ItemFilter; pageInput: PageInput }
  >(GET_SELLABLE_ITEMS, {
    variables: {
      itemFilter,
      pageInput,
    },
  });

  const total = useSellableItemsCount({ filter: itemFilter });

  return { data: data?.items, total, loading, refetch };
};