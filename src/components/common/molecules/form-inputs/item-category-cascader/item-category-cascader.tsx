import React from 'react';
import { Cascader } from 'antd';
import { CascaderValueType } from 'antd/lib/cascader';

import { useItemCategoryTree } from './hooks';

import { FormInputProps } from '..';

export type ItemCategoryCascaderProps = FormInputProps<CascaderValueType> & {
  hasAll?: boolean;
};

function ItemCategoryCascader({
  value,
  defaultValue,
  onChange,
  hasAll = false,
}: ItemCategoryCascaderProps) {
  const { data: majorCategories = [] } = useItemCategoryTree();
  const options = (
    hasAll ? [{ id: undefined, name: '전체', children: null }] : []
  )
    .concat(majorCategories)
    .map(({ id, name, children }) => ({
      value: id,
      label: name,
      ...(children && {
        children: (hasAll
          ? [{ id: undefined, name: '전체', children: null }]
          : []
        )
          .concat(children)
          .map(({ id: cid, name: cname }) => ({
            value: cid,
            label: cname,
          })),
      }),
    }));

  const handleChange = (value: CascaderValueType) => {
    onChange([value[0], value[1] || undefined]);
  };

  return (
    <Cascader
      value={value}
      defaultValue={defaultValue}
      options={options}
      onChange={handleChange}
    />
  );
}

export default ItemCategoryCascader;
