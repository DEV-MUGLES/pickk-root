import { gql, useQuery } from '@apollo/client';
import {
  OrderItem,
  SearchOrderItemsOutput,
  QuerySearchRootOrderItemsArgs,
  OrderItemSearchFilter,
  Item,
  Seller,
  ExchangeRequest,
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

    itemFinalPrice
    shippingFee

    usedPointAmount

    paidAt

    item {
      id
      sellPrice
    }
    seller {
      settlePolicy {
        rate
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
  | 'itemFinalPrice'
  | 'shippingFee'
  | 'usedPointAmount'
> & {
  item: Pick<Item, 'sellPrice'>;
  seller: Pick<Seller, 'settlePolicy'>;
  exchangeRequest: Pick<ExchangeRequest, 'shippingFee'>;
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
      searchFilter: { ...filter, isConfirmed: true },
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
