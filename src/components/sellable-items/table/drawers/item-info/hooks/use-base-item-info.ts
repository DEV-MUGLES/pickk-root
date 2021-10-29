import { gql, useQuery } from '@apollo/client';
import { Item, ItemCategory, QueryItemArgs } from '@pickk/common';

const GET_ITEM_BASE_INFO = gql`
  query item($id: Int!) {
    item(id: $id) {
      id
      name
      imageUrl
      majorCategoryId
      minorCategoryId
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

export type ItemBaseInfoDataType = Pick<
  Item,
  'id' | 'name' | 'imageUrl' | 'majorCategoryId' | 'minorCategoryId'
> & {
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
};

export const useBaseItemInfo = (id: number) => {
  const { data } = useQuery<
    {
      item: ItemBaseInfoDataType;
    },
    QueryItemArgs
  >(GET_ITEM_BASE_INFO, {
    variables: {
      id,
    },
  });

  return { data: data?.item };
};
