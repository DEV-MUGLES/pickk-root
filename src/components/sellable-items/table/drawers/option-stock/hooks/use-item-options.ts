import {gql, useQuery} from '@apollo/client';
import {Item, ItemOption, ItemOptionValue, QueryItemArgs} from '@pickk/common';

const GET_ITEM_OPTIONS = gql`
  query item($id: Int!) {
    item(id: $id) {
      id
      options {
        id
        name
        order
        values {
          id
          name
          priceVariant
        }
      }
    }
  }
`;

export type ItemOptionDataType = Pick<ItemOption, 'id' | 'name' | 'order'> & {
  values: Array<Pick<ItemOptionValue, 'id' | 'name' | 'priceVariant'>>;
};

export const useItemOptions = (itemId: number) => {
  const {data} = useQuery<
    {
      item: Pick<Item, 'id'> & {
        options: ItemOptionDataType[];
      };
    },
    QueryItemArgs
  >(GET_ITEM_OPTIONS, {
    variables: {
      id: itemId,
    },
  });

  return {options: data?.item?.options};
};
