import { Select, SelectProps } from 'antd';

import { FormInputProps } from './form-input.types';

const { Option } = Select;

type SelectInputValueType = string | number;

export type SelectInputProps = FormInputProps<SelectInputValueType> & {
  options: { label: string; value: SelectInputValueType }[];
} & Pick<SelectProps<unknown>, 'showSearch'>;

export default function SelectInput(props: SelectInputProps) {
  const { onChange, options, ...selectProps } = props;

  const handleChange = (value: SelectInputValueType) => {
    onChange(value == null ? undefined : value);
  };

  const renderOptions = () => {
    return options.map(({ label, value }) => (
      <Option key={value} value={value}>
        {label}
      </Option>
    ));
  };

  return (
    <Select style={{ width: 160 }} {...selectProps} onChange={handleChange}>
      <Option value={undefined}>전체</Option>
      {renderOptions()}
    </Select>
  );
}
