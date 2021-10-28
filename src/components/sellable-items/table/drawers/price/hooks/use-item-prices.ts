import {gql, useQuery} from '@apollo/client';
import {Item, QueryItemArgs} from '@pickk/common';

const GET_ITEM_PRICES = gql`
  query item($id: Int!) {
    item(id: $id) {
      id
      originalPrice
      sellPrice
      finalPrice
      prices {
        createdAt
        displayPrice
        endAt
        finalPrice
        id
        isActive
        isBase
        isCrawlUpdating
        itemId
        originalPrice
        pickkDiscountAmount
        pickkDiscountRate
        sellPrice
        startAt
        unit
        updatedAt
      }
    }
  }
`;

export const useItemPrices = (itemId: number) => {
  const {data} = useQuery<
    {
      item: Pick<
        Item,
        'id' | 'originalPrice' | 'sellPrice' | 'finalPrice' | 'prices'
      >;
    },
    QueryItemArgs
  >(GET_ITEM_PRICES, {
    variables: {
      id: itemId,
    },
  });

  return {data: data?.item};
};
