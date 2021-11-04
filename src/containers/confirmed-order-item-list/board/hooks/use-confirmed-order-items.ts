import { gql, useQuery } from '@apollo/client';
import {
  OrderItem,
  SearchOrderItemsOutput,
  QuerySearchRootOrderItemsArgs,
  OrderItemSearchFilter,
  Item,
  Seller,
  ExchangeRequest,
  Order,
  OrderBuyer,
  Product,
  Campaign,
} from '@pickk/common';

import { BoardTableDataFetcher } from '@components/common/organisms/board-table';

const CONFIRMED_ORDER_ITEM_FRAGMENT = gql`
  fragment orderItemFragment on OrderItem {
    id
    merchantUid
    orderMerchantUid
    createdAt
    status
    claimStatus
    itemId
    itemName
    brandNameKor
    productVariantName
    quantity
    recommenderNickname

    itemFinalPrice
    shippingFee
    itemSellPrice
    productPriceVariant

    usedPointAmount

    paidAt

    campaign {
      id
      rate
    }
    item {
      id
      sellPrice
    }
    seller {
      settlePolicy {
        rate
      }
    }

    order {
      buyer {
        id
        name
      }
    }

    exchangeRequest {
      shippingFee
    }
  }
`;

const GET_CONFIRMED_ORDER_ITEMS = gql`
  query searchRootOrderItems(
    $searchFilter: OrderItemSearchFilter
    $pageInput: PageInput
    $query: String
  ) {
    searchRootOrderItems(
      searchFilter: $searchFilter
      pageInput: $pageInput
      query: $query
    ) {
      result {
        ...orderItemFragment
      }
      total
    }
  }
  ${CONFIRMED_ORDER_ITEM_FRAGMENT}
`;

export type ConfirmedOrderItemDataType = Pick<
  OrderItem,
  | 'id'
  | 'merchantUid'
  | 'orderMerchantUid'
  | 'createdAt'
  | 'status'
  | 'claimStatus'
  | 'itemId'
  | 'itemName'
  | 'brandNameKor'
  | 'productVariantName'
  | 'quantity'
  | 'paidAt'
  | 'itemSellPrice'
  | 'itemFinalPrice'
  | 'shippingFee'
  | 'productPriceVariant'
  | 'usedPointAmount'
> & {
  campaign: Pick<Campaign, 'rate'>;
  item: Pick<Item, 'sellPrice'>;
  product: Pick<Product, 'priceVariant'>;
  seller: Pick<Seller, 'settlePolicy'>;
  exchangeRequest: Pick<ExchangeRequest, 'shippingFee'>;
  order: Pick<Order, 'id'> & {
    buyer: Pick<OrderBuyer, 'id' | 'name'>;
  };
};

export const useConfirmedOrderItems: BoardTableDataFetcher<
  ConfirmedOrderItemDataType,
  OrderItemSearchFilter
> = ({ filter, pageInput, query }) => {
  const { data, loading, refetch } = useQuery<
    {
      searchRootOrderItems: Pick<SearchOrderItemsOutput, 'total'> & {
        result: ConfirmedOrderItemDataType[];
      };
    },
    QuerySearchRootOrderItemsArgs
  >(GET_CONFIRMED_ORDER_ITEMS, {
    variables: {
      searchFilter: { ...filter, isConfirmed: true, isSettled: false },
      pageInput,
      query,
    },
  });

  return {
    data: data?.searchRootOrderItems?.result,
    total: data?.searchRootOrderItems?.total,
    loading,
    refetch,
  };
};
