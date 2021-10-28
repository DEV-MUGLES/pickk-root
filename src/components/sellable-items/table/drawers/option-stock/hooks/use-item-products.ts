import {gql, useQuery} from '@apollo/client';
import {Item, Product, ItemOptionValue, QueryItemArgs} from '@pickk/common';

const GET_ITEM_PRODUCTS = gql`
  query item($id: Int!) {
    item(id: $id) {
      id
      isInfiniteStock
      products {
        id
        stock
        priceVariant
        isDeleted
        createdAt
        updatedAt
        itemOptionValues {
          id
          name
          priceVariant
          itemOptionId
        }
      }
    }
  }
`;

export type ItemProductDataType = Pick<
  Product,
  'id' | 'stock' | 'priceVariant' | 'isDeleted' | 'createdAt' | 'updatedAt'
> & {
  itemOptionValues: Array<
    Pick<ItemOptionValue, 'id' | 'name' | 'priceVariant' | 'itemOptionId'>
  >;
};

export const useItemProducts = (itemId: number) => {
  const {data} = useQuery<
    {
      item: Pick<Item, 'id' | 'isInfiniteStock'> & {
        products: ItemProductDataType[];
      };
    },
    QueryItemArgs
  >(GET_ITEM_PRODUCTS, {
    variables: {
      id: itemId,
    },
  });

  return {
    products: data?.item?.products?.filter((v) => !v.isDeleted),
    isInfiniteStock: data?.item?.isInfiniteStock,
  };
};
