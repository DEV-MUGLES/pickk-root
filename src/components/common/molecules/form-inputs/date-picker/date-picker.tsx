import React from 'react';
import { Select, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { RangePicker } from '@components/common/molecules/form-inputs';

import DatePickerQuickButtons, {
  quickBtnValue2StartDate,
} from './quick-buttons';

import { DatePickerProps } from './date-picker.types';

const { Option } = Select;

export default function DatePicker(props: DatePickerProps) {
  const propsWithDefault: DatePickerProps = {
    defaultQuickButtonValue: 'oneMonth',
    ...props,
  };
  const {
    value,
    defaultValue,
    lookupOptions,
    defaultQuickButtonValue,
    onChange,
  } = propsWithDefault;

  const defaultSelectedRange: [Dayjs, Dayjs] = defaultValue
    ? defaultValue.range
    : [quickBtnValue2StartDate(defaultQuickButtonValue), dayjs()];

  const handleChoicedSelectChange = (selectedOption: string) => {
    onChange({
      lookup: selectedOption,
      range: value?.range ?? defaultSelectedRange,
    });
  };

  const handleRangeChange = (range: [Dayjs, Dayjs]) => {
    if (lookupOptions && !value?.lookup) {
      alert('조회기간 기준을 먼저 선택해주세요');
      return;
    }

    onChange({
      lookup: value.lookup,
      range,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {lookupOptions && (
        <Select
          value={value?.lookup}
          defaultValue={defaultValue?.lookup}
          onChange={(value) => handleChoicedSelectChange(value.toString())}
          style={{ width: '20rem', marginBottom: '0.8rem' }}
        >
          {lookupOptions.map((option) => (
            <Option key={option.name} value={option.value}>
              <Typography.Text>{option.name}</Typography.Text>
            </Option>
          ))}
        </Select>
      )}
      <DatePickerQuickButtons
        defaultQuickButtonValue={defaultQuickButtonValue}
        onChange={handleRangeChange}
      />
      <RangePicker
        value={value?.range ?? defaultSelectedRange}
        defaultValue={defaultSelectedRange}
        onChange={handleRangeChange}
      />
    </div>
  );
}
