import { Input } from 'antd';

import { ItemCategoryCascader, DatePicker } from '@components/common/molecules';

import { BoardFilterInputType } from '@components/common/organisms/board-filter';

import BrandSelector from './brand';

export const itemsFilterInputs: BoardFilterInputType[] = [
  {
    name: 'search',
    label: '상품명',
    Component: (props) => <Input {...props} style={{ width: '20rem' }} />,
  },
  {
    name: 'brandId',
    label: '브랜드',
    Component: BrandSelector,
  },
  {
    name: 'category',
    label: '카테고리',
    Component: (props) => (
      <ItemCategoryCascader {...props} style={{ width: '20rem' }} hasAll />
    ),
  },
  {
    name: 'period',
    label: '조회기간',
    Component: (props) => (
      <DatePicker
        {...props}
        lookupOptions={[
          { name: '상품생성일', value: 'createdAtBetween' },
          { name: '활성등록일', value: 'sellableAtBetween' },
        ]}
        defaultQuickButtonValue="oneMonth"
      />
    ),
  },
];
