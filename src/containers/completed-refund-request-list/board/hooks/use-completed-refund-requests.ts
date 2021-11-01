import { gql, useQuery } from '@apollo/client';
import {
  OrderItem,
  SearchOrderItemsOutput,
  QuerySearchRootRefundRequestsArgs,
  RefundRequestSearchFilter,
  RefundRequestStatus,
  RefundRequest,
  Order,
} from '@pickk/common';

import { BoardTableDataFetcher } from '@components/common/organisms/board-table';

const CONFIRMED_REFUND_REQUEST_FRAGMENT = gql`
  fragment refundRequestFragment on RefundRequest {
    merchantUid
    orderMerchantUid
    status
    amount
    shippingFee

    requestedAt
    confirmedAt

    order {
      paidAt
    }
    orderItems {
      merchantUid
      brandNameKor
    }
  }
`;

const GET_CONFIRMED_REFUND_REQUESTS = gql`
  query searchRootRefundRequests(
    $searchFilter: RefundRequestSearchFilter
    $pageInput: PageInput
    $query: String
  ) {
    searchRootRefundRequests(
      searchFilter: $searchFilter
      pageInput: $pageInput
      query: $query
    ) {
      result {
        ...refundRequestFragment
      }
      total
    }
  }
  ${CONFIRMED_REFUND_REQUEST_FRAGMENT}
`;

export type ConfirmedRefundRequestDataType = Pick<
  RefundRequest,
  | 'merchantUid'
  | 'orderMerchantUid'
  | 'status'
  | 'amount'
  | 'shippingFee'
  | 'requestedAt'
  | 'confirmedAt'
> & {
  order: Pick<Order, 'paidAt'>;
  orderItems: Pick<OrderItem, 'merchantUid' | 'brandNameKor'>[];
};

export const useCopmletedRefundRequests: BoardTableDataFetcher<
  ConfirmedRefundRequestDataType,
  RefundRequestSearchFilter
> = ({ filter, pageInput, query }) => {
  const { data, loading, refetch } = useQuery<
    {
      searchRootRefundRequests: Pick<SearchOrderItemsOutput, 'total'> & {
        result: ConfirmedRefundRequestDataType[];
      };
    },
    QuerySearchRootRefundRequestsArgs
  >(GET_CONFIRMED_REFUND_REQUESTS, {
    variables: {
      searchFilter: { ...filter, status: RefundRequestStatus.Confirmed },
      pageInput,
      query,
    },
  });

  return {
    data: data?.searchRootRefundRequests?.result,
    total: data?.searchRootRefundRequests?.total,
    loading,
    refetch,
  };
};
