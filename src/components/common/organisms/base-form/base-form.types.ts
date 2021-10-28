import { FormItemProps } from 'antd';
import { ElementType } from 'react';

export type BaseFormItemValueProps = {
  name: string;
  label: string;
  /** prop으로 value, onChange를 포함하고 있어야 정상작동한다.
   * prop으로 defaultValue를 포함해야 defaultFilter가 정상작동한다.*/
  Component: ElementType;
} & Omit<FormItemProps, 'name' | 'label'>;

export type BaseFormProps = {
  formItems: BaseFormItemValueProps[];
  defaultValue?: Record<string, unknown>;
  onSaveClick: (value: any) => Promise<boolean>;
};
