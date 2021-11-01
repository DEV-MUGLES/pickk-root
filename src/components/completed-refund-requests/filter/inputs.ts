import { Input } from 'antd';

import { BoardFilterInputType } from '@components/common/organisms/board-filter';

import { RangePicker } from '@components/common/molecules';

export const confirmedRefundRequestsFilterInputs: BoardFilterInputType[] = [
  {
    name: 'query',
    label: '검색어',
    Component: Input,
  },
  {
    name: 'requestedAtBetween',
    label: '반품신청일시',
    Component: RangePicker,
  },
  {
    name: 'confirmedAtBetween',
    label: '반품완료일시',
    Component: RangePicker,
  },
];
