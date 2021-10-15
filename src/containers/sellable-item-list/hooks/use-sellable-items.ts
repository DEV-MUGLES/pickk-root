import { gql, useQuery } from '@apollo/client';
import {
  Item,
  ItemFilter,
  QueryItemsArgs,
  ItemUrl,
  ItemCategory,
  Product,
} from '@pickk/common';

import { BoardDataFetcher } from '@components/common/template/board';

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
  urls: Array<Pick<ItemUrl, 'id' | 'isPrimary' | 'url'>>;
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
  products: Array<Pick<Product, 'id' | 'stock' | 'isDeleted'>>;
};

export const useSellableItems: BoardDataFetcher<
  SellableItemDataType,
  ItemFilter
> = ({ filter }) => {
  const itemFilter: ItemFilter = {
    ...filter,
    isSellable: true,
  };

  const { data, loading, refetch } = useQuery<
    { items: SellableItemDataType[] },
    QueryItemsArgs
  >(GET_SELLABLE_ITEMS, {
    variables: {
      itemFilter,
      /** @TODO 페이지네이션 */
    },
  });

  return { data: data?.items, loading, refetch };
};
