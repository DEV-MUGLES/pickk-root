import { gql, useQuery } from '@apollo/client';
import {
  OrderItem,
  Order,
  OrderBuyer,
  OrderReceiver,
  SearchOrderItemsOutput,
  QuerySearchRootOrderItemsArgs,
  OrderItemFilter,
} from '@pickk/common';

import { BoardDataFetcher } from '@components/common/template/board';

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
  ) {
    searchRootOrderItems(searchFilter: $searchFilter, pageInput: $pageInput) {
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

export const useOrderItems: BoardDataFetcher<
  OrderItemDataType,
  OrderItemFilter
> = ({ filter, pageInput }) => {
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
    },
  });

  return {
    data: data?.searchRootOrderItems?.result,
    total: data?.searchRootOrderItems?.total,
    loading,
    refetch,
  };
};
