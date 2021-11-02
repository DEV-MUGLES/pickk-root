import { Radio, RadioChangeEvent } from 'antd';

import { FormInputProps } from './form-input.types';

export type TripleSwitchProps = FormInputProps<boolean> & {
  trueText?: string;
  falseText?: string;
};

function TripleSwitch(props: TripleSwitchProps) {
  const { value, onChange, trueText, falseText } = props;

  const handleChange = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <Radio.Group onChange={handleChange} value={value ?? undefined}>
      <Radio.Button value={undefined}>전체</Radio.Button>
      <Radio.Button value={true}>{trueText ?? 'Y'}</Radio.Button>
      <Radio.Button value={false}>{falseText ?? 'N'}</Radio.Button>
    </Radio.Group>
  );
}

export default TripleSwitch;
