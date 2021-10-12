import { OrderItemStatus } from '@pickk/common';

export const getOrderItemStatusDisplayName = (status: OrderItemStatus) => {
  if (!status) {
    return;
  }

  const {
    Pending,
    Failed,
    VbankReady,
    VbankDodged,
    Paid,
    ShipPending,
    ShipReady,
    Shipped,
    Shipping,
  } = OrderItemStatus;

  return (
    {
      [Pending]: '결제 대기',
      [Failed]: '결제 취소',
      [VbankReady]: '입금 대기',
      [VbankDodged]: '입금 전 취소',
      [Paid]: '결제 완료',
      [ShipPending]: '배송 예약중',
      [ShipReady]: '배송 준비중',
      [Shipping]: '배송중',
      [Shipped]: '배송 완료',
    }[status] || status
  );
};
