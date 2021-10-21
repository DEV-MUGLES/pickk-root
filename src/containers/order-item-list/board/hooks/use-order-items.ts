import { gql, useQuery } from '@apollo/client';
import {
  OrderItem,
  Order,
  OrderBuyer,
  OrderReceiver,
  SearchOrderItemsOutput,
  QuerySearchRootOrderItemsArgs,
  OrderItemSearchFilter,
} from '@pickk/common';

import { BoardTableDataFetcher } from '@components/common/organisms/board-table';

const ORDER_ITEM_FRAGMENT = gql`
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
    order {
      id
      buyer {
        id
        name
        phoneNumber
      }
      receiver {
        id
        name
        receiverName
      }
    }
  }
`;

const GET_ORDER_ITEMS = gql`
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
  ${ORDER_ITEM_FRAGMENT}
`;

export type OrderItemDataType = Pick<
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
> & {
  order: Pick<Order, 'id'> & {
    buyer: Pick<OrderBuyer, 'id' | 'name' | 'phoneNumber'>;
    receiver: Pick<OrderReceiver, 'id' | 'name' | 'receiverName'>;
  };
};

export const useOrderItems: BoardTableDataFetcher<
  OrderItemDataType,
  OrderItemSearchFilter
> = ({ filter, pageInput, query }) => {
  const { data, loading, refetch } = useQuery<
    {
      searchRootOrderItems: Pick<SearchOrderItemsOutput, 'total'> & {
        result: OrderItemDataType[];
      };
    },
    QuerySearchRootOrderItemsArgs
  >(GET_ORDER_ITEMS, {
    variables: {
      searchFilter: filter,
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
