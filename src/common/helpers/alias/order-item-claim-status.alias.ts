import {OrderItemClaimStatus} from '@pickk/common';

export const getOrderItemClaimStatusDisplayName = (
  status: OrderItemClaimStatus,
) => {
  if (!status) {
    return;
  }

  const {
    CancelRequested,
    Cancelled,
    ExchangeRequested,
    Exchanged,
    RefundRequested,
    Refunded,
  } = OrderItemClaimStatus;

  return (
    {
      [CancelRequested]: '취소 요청',
      [Cancelled]: '취소 완료',
      [ExchangeRequested]: '교환 요청',
      [Exchanged]: '교환 완료',
      [RefundRequested]: '환불 요청',
      [Refunded]: '환불 완료',
    }[status] || status
  );
};
