import { gql, useQuery } from '@apollo/client';
import {
  OrderItem,
  Order,
  OrderBuyer,
  OrderReceiver,
  QueryRootOrderItemsArgs,
} from '@pickk/common';

import { BoardTemplateProps } from '@components/common/template';

const GET_ORDER_ITEMS = gql`
  query rootOrderItems($orderItemFilter: OrderItemFilter) {
    rootOrderItems(orderItemFilter: $orderItemFilter) {
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
        }
      }
    }
  }
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
    receiver: Pick<OrderReceiver, 'id' | 'name'>;
  };
};

export const useOrderItems: BoardTemplateProps['useBoardData'] = ({
  filter,
}) => {
  const {
    data,
    loading,
    refetch: _refetch,
  } = useQuery<
    { rootOrderItems: OrderItemDataType[] },
    QueryRootOrderItemsArgs
  >(GET_ORDER_ITEMS, {
    variables: {
      orderItemFilter: filter,
    },
  });

  const refetch = async () => {
    await _refetch({
      orderItemFilter: filter,
    });
  };

  return { data: data?.rootOrderItems, loading, refetch };
};