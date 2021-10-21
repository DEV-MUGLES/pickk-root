import { gql, useQuery } from '@apollo/client';
import {
  Item,
  ItemFilter,
  Brand,
  ItemUrl,
  ItemCategory,
  PageInput,
} from '@pickk/common';

import { BoardTableDataFetcher } from '@components/common/organisms/board-table';

import { useItemsCount } from './use-items-count';

const GET_ITEMS = gql`
  query items($itemFilter: ItemFilter, $pageInput: PageInput) {
    items(itemFilter: $itemFilter, pageInput: $pageInput) {
      id
      imageUrl
      name
      originalPrice
      sellPrice
      isSellable
      createdAt
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
    }
  }
`;

export type ItemDataType = Pick<
  Item,
  | 'id'
  | 'imageUrl'
  | 'name'
  | 'originalPrice'
  | 'sellPrice'
  | 'isSellable'
  | 'createdAt'
> & {
  brand: Pick<Brand, 'id' | 'nameKor'>;
  urls: Array<Pick<ItemUrl, 'id' | 'isPrimary' | 'url'>>;
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
};

export const formatItemFilter = (
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

export const useItems: BoardTableDataFetcher<ItemDataType, ItemFilter> = ({
  filter,
  pageInput,
}) => {
  const itemFilter: ItemFilter = {
    ...formatItemFilter(filter),
  };

  const { data, loading, refetch } = useQuery<
    { items: ItemDataType[] },
    { itemFilter: ItemFilter; pageInput: PageInput }
  >(GET_ITEMS, {
    variables: {
      itemFilter,
      pageInput,
    },
  });
  const total = useItemsCount({ filter: itemFilter });

  return { data: data?.items, total, loading, refetch };
};
