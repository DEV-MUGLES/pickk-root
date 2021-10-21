import React, { CSSProperties } from 'react';
import { Cascader } from 'antd';

import { useItemCategoryTree } from './hooks';

import { FormInputProps } from '..';
import { CascaderValueType } from 'antd/lib/cascader';

export type ItemCategoryCascaderProps = FormInputProps<[number, number]> & {
  hasAll?: boolean;
  style?: CSSProperties;
};

function ItemCategoryCascader({
  value,
  onChange,
  hasAll = false,
  style,
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
    const [majorCategoryId, minorCategoryId] = value as [number, number];
    onChange([majorCategoryId, minorCategoryId || undefined]);
  };

  return (
    <Cascader
      style={style}
      value={value}
      options={options}
      onChange={handleChange}
      {...(hasAll ? { placeholder: null } : {})}
    />
  );
}

export default ItemCategoryCascader;
