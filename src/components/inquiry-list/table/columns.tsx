import dayjs from 'dayjs';
import { ColumnsType } from 'antd/lib/table';

import { getInquiryTypeDisplayName, stringSorter } from '@src/common/helpers';
import { InquiryDataType } from '@containers/inquiry-list/board/hooks';

import InquiriesTableItemCard from './item-card';

export const inquiriesColumns: ColumnsType<InquiryDataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => stringSorter(b.id.toString(), a.id.toString()),
    width: 60,
    ellipsis: true,
  },
  {
    title: '답변여부',
    dataIndex: 'isAnswered',
    key: 'isAnswered',
    render: (value) => (value ? '✅' : '❌'),
    width: 60,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '상품정보',
    dataIndex: 'itemInfo',
    key: 'itemInfo',
    render: (_, record) => (
      <InquiriesTableItemCard
        imageUrl={record.item.imageUrl}
        name={record.item.name}
      />
    ),
  },
  {
    title: '작성자(닉네임)',
    dataIndex: 'userName',
    key: 'userName',
    render: (_, record) => record.user.nickname,
    width: 80,
    ellipsis: true,
  },
  {
    title: '전화번호',
    dataIndex: 'contactPhoneNumber',
    key: 'contactPhoneNumber',
    width: 80,
    ellipsis: true,
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    width: 120,
    ellipsis: true,
  },
  {
    title: '내용',
    dataIndex: 'content',
    key: 'content',
    width: 160,
    ellipsis: true,
  },
  {
    title: '문의발생시간',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => stringSorter(b.createdAt, a.createdAt),
    render: (value) =>
      `${dayjs(value).format('YYYY.MM.DD hh:mm')} (${dayjs(value).fromNow()})`,
    width: 80,
  },
  {
    title: '주문상품번호',
    dataIndex: 'orderItemMerchantUid',
    key: 'orderItemMerchantUid',
    width: 100,
  },
  {
    title: '문의타입',
    dataIndex: 'type',
    key: 'type',
    render: (value) => getInquiryTypeDisplayName(value) + '문의',
    width: 100,
  },
  {
    title: '비밀글여부',
    dataIndex: 'isSecret',
    key: 'isSecret',
    render: (value) => (value ? '비밀글' : '공개'),
    width: 80,
    ellipsis: true,
    align: 'center',
  },
];
