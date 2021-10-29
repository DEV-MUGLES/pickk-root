import { Checkbox } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { FormInputProps, DayjsDatePicker } from '@components/common/molecules';

export type StartAtInputProps = FormInputProps<Dayjs> & {
  hideCheckbox: boolean;
};

function StartAtInput(props: StartAtInputProps) {
  const { value, onChange = () => null, hideCheckbox } = props;

  const handleDateChange = (date: dayjs.ConfigType) => {
    onChange(dayjs(date).startOf('day'));
  };

  const handleCheckboxChange = (e: { target: { checked: boolean } }) => {
    if (e.target.checked) {
      handleDateChange(dayjs());
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}
    >
      <DayjsDatePicker
        onChange={handleDateChange}
        value={value}
        style={{ marginRight: 'auto' }}
      />
      {!hideCheckbox && (
        <Checkbox onChange={handleCheckboxChange}>
          현재 가격으로 활성화하기
        </Checkbox>
      )}
    </div>
  );
}

export default StartAtInput;
