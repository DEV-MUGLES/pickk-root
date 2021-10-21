import dayjs, { Dayjs } from 'dayjs';

import { setStartOfDay, setEndOfDay } from '@common/helpers';

import DayjsDatePicker from '../../dayjs-date-picker';

import { FormInputProps } from '../form-input.types';

const { RangePicker: _RangePicker } = DayjsDatePicker;

export type RangePickerProps = FormInputProps<[Dayjs, Dayjs]>;

export default function RangePicker(props: RangePickerProps) {
  const { onChange } = props;

  const handleChange = (e: [Dayjs, Dayjs]) => {
    if (!e?.[0] && !e?.[1]) {
      onChange(undefined);
      return;
    }

    onChange([setStartOfDay(dayjs(e[0])), setEndOfDay(dayjs(e[1]))]);
  };

  return (
    <_RangePicker
      {...props}
      onChange={handleChange}
      style={{ width: '20rem' }}
    />
  );
}
