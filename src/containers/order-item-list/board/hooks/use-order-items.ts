import { gql, useQuery } from '@apollo/client';
import {
  OrderItem,
  Order,
  OrderBuyer,
  OrderReceiver,
  QueryRootOrderItemsArgs,
  OrderItemFilter,
} from '@pickk/common';

import { BoardDataFetcher } from '@components/common/template/board';

const GET_ORDER_ITEMS = gql`
  query rootOrderItems(
    $orderItemFilter: OrderItemFilter
    $pageInput: PageInput
  ) {
    rootOrderItems(orderItemFilter: $orderItemFilter, pageInput: $pageInput) {
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
    receiver: Pick<OrderReceiver, 'id' | 'name' | 'receiverName'>;
  };
};

/** @TODO 데이터 총 개수를 알기 위한 임시 쿼리 훅 */
const useOrderItemsCount = ({
  filter,
}: {
  filter: OrderItemFilter;
}): number => {
  const { data } = useQuery<
    { rootOrderItems: OrderItemDataType[] },
    QueryRootOrderItemsArgs
  >(
    gql`
      query rootOrderItems($orderItemFilter: OrderItemFilter) {
        rootOrderItems(orderItemFilter: $orderItemFilter) {
          id
        }
      }
    `,
    {
      variables: {
        orderItemFilter: filter,
      },
    }
  );

  return (data?.rootOrderItems || []).length;
};

export const useOrderItems: BoardDataFetcher<
  OrderItemDataType,
  OrderItemFilter
> = ({ filter, pageInput }) => {
  const { data, loading, refetch } = useQuery<
    { rootOrderItems: OrderItemDataType[] },
    QueryRootOrderItemsArgs
  >(GET_ORDER_ITEMS, {
    variables: {
      orderItemFilter: filter,
      pageInput,
    },
  });

  const total = useOrderItemsCount({ filter });

  return { data: data?.rootOrderItems, total, loading, refetch };
};
