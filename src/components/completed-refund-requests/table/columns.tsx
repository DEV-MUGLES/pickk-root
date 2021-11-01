import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';

import { ConfirmedRefundRequestDataType } from '@containers/completed-refund-request-list/board/hooks';

export const completedRefundRequestsTableColumns: ColumnsType<ConfirmedRefundRequestDataType> =
  [
    {
      title: '반품고유번호',
      dataIndex: 'merchantUid',
      key: 'merchantUid',
      width: 120,
      ellipsis: true,
    },
    {
      title: '주문번호',
      dataIndex: 'orderMerchantUid',
      key: 'orderMerchantUid',
      width: 120,
      ellipsis: true,
    },
    {
      title: '상품별 주문번호 (복수)',
      dataIndex: 'orderItemsMerchantUid',
      key: 'orderItemsMerchantUid',
      render: (_, { orderItems }) =>
        orderItems.map((v) => v.merchantUid).join(', '),
      width: 120,
      ellipsis: true,
    },
    {
      title: '구매일시',
      dataIndex: 'orderPaidAt',
      key: 'orderPaidAt',
      render: (_, { order }) =>
        order?.paidAt
          ? dayjs(order?.paidAt).format('YYYY.MM.DD HH:mm:ss')
          : '-',
      width: 120,
      ellipsis: true,
    },
    {
      title: '반품신청일시',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
      render: (value) =>
        value ? dayjs(value).format('YYYY.MM.DD HH:mm:ss') : '-',
      width: 120,
      ellipsis: true,
    },
    {
      title: '반품완료일시',
      dataIndex: 'confirmedAt',
      key: 'confirmedAt',
      render: (value) =>
        value ? dayjs(value).format('YYYY.MM.DD HH:mm:ss') : '-',
      width: 120,
      ellipsis: true,
    },
    {
      title: '브랜드명',
      dataIndex: 'orderItemBrandNameKor',
      key: 'orderItemBrandNameKor',
      render: (_, { orderItems }) => orderItems[0].brandNameKor,
      width: 120,
      ellipsis: true,
    },
    {
      title: '환불 액수 (배송비 제외)',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      ellipsis: true,
    },
    {
      title: '차감된 반품배송비',
      dataIndex: 'shippingFee',
      key: 'shippingFee',
      width: 120,
      ellipsis: true,
    },
  ];
