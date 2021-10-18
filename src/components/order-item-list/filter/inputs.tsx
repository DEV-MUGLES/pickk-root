import { Input } from 'antd';

import { BoardFilterInputType } from '@components/common/organisms/board-filter';

import StatusSelect from './status';
import ClaimStatusSelect from './claim-status';

export const orderItemsFilterInputs: BoardFilterInputType[] = [
  {
    name: 'query',
    label: '검색어',
    Component: Input,
  },
  {
    name: 'status',
    label: '주문상태',
    Component: StatusSelect,
  },
  {
    name: 'claimStatus',
    label: '클레임상태',
    Component: ClaimStatusSelect,
  },
];
