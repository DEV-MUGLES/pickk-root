import { Input } from 'antd';

import { BaseFormItemValueProps } from '@components/common/organisms/base-form';

export const priceEditFormItems: BaseFormItemValueProps[] = [
  {
    name: 'originalPrice',
    label: '정가 (단위: 원)',
    Component: Input,
    rules: [{ required: true, message: '정가를 입력해주세요' }],
  },
  {
    name: 'sellPrice',
    label: '판매가 (단위: 원)',
    Component: Input,
    rules: [{ required: true, message: '판매가를 입력해주세요' }],
  },
];
