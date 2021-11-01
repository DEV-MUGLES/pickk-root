import dayjs from 'dayjs';
import { ColumnsType } from 'antd/lib/table';

import { ConfirmedOrderItemDataType } from '@containers/confirmed-order-item-list/board/hooks';

import {
  getOrderItemClaimStatusDisplayName,
  getOrderItemStatusDisplayName,
  stringSorter,
} from '@common/helpers';

export const confirmedOrderItemsTableColumns: ColumnsType<ConfirmedOrderItemDataType> =
  [
    {
      title: '주문번호',
      dataIndex: 'orderMerchantUid',
      key: 'orderMerchantUid',
      width: 120,
      ellipsis: true,
    },
    {
      title: '상품별 주문번호',
      dataIndex: 'merchantUid',
      key: 'merchantUid',
      width: 140,
      ellipsis: true,
    },
    {
      title: '상품 ID',
      dataIndex: 'itemId',
      key: 'itemId',
      width: 140,
      ellipsis: true,
    },
    {
      title: '주문일시',
      dataIndex: 'paidAt',
      key: 'paidAt',
      render: (value) =>
        value ? dayjs(value).format('YYYY.MM.DD HH:mm:ss') : '-',
      width: 140,
      ellipsis: true,
    },
    {
      title: '주문상태',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status, claimStatus }) =>
        getOrderItemClaimStatusDisplayName(claimStatus) ??
        getOrderItemStatusDisplayName(status),
      width: 140,
      ellipsis: true,
    },
    {
      title: '브랜드명',
      dataIndex: 'brandNameKor',
      key: 'brandNameKor',
      width: 140,
      ellipsis: true,
    },
    {
      title: '상품명',
      dataIndex: 'itemName',
      key: 'itemName',
      width: 140,
      ellipsis: true,
    },
    {
      title: '옵션(통합)',
      dataIndex: 'productVariantName',
      key: 'productVariantName',
      width: 140,
      ellipsis: true,
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 140,
      ellipsis: true,
    },
    {
      title: '사용된 포인트',
      dataIndex: 'usedPointAmount',
      key: 'usedPointAmount',
      width: 140,
      ellipsis: true,
    },
    {
      title: '결제액(상품판매가*수량+배송비-포인트)',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      render: (_, { itemFinalPrice, shippingFee, quantity, usedPointAmount }) =>
        itemFinalPrice * quantity + shippingFee - usedPointAmount,
      width: 140,
      ellipsis: true,
    },
    {
      title: '정산비율(퇴점한 경우 70)',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
      render: (_, { seller }) => seller?.settlePolicy.rate ?? 70,
      width: 140,
      ellipsis: true,
    },
    {
      title: '정산기준액(상품공급가*수량+배송비)*정산비율',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
      render: (_, { item, shippingFee, quantity, seller }) =>
        Math.floor(
          ((item.sellPrice * quantity + shippingFee) *
            (seller?.settlePolicy.rate ?? 70)) /
            100
        ),
      width: 140,
      ellipsis: true,
    },
    {
      title: '결제된 교환배송비',
      dataIndex: 'exchangeRequestShippingFee',
      key: 'exchangeRequestShippingFee',
      render: (_, { exchangeRequest }) => exchangeRequest?.shippingFee ?? '-',
      width: 140,
      ellipsis: true,
    },
  ];
