import { Input } from 'antd';

import { TripleSwitch } from '@components/common/molecules';

import { BoardFilterInputType } from '@components/common/organisms/board-filter';

export const inquiryListFilterInputs: BoardFilterInputType[] = [
  {
    name: 'query',
    label: '검색어',
    Component: Input,
  },
  {
    name: 'isAnswered',
    label: '답변여부',
    Component: (props) => (
      <TripleSwitch {...props} trueText="답변완료" falseText="미답변" />
    ),
  },
];
