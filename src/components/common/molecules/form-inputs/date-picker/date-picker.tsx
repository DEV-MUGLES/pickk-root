import React from 'react';
import styled from 'styled-components';
import { Select, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { RangePicker } from '@components/common/molecules/form-inputs';

import DatePickerQuickButtons, {
  quickBtnValue2StartDate,
} from './quick-buttons';

import { DatePickerProps } from './date-picker.types';

const { Option } = Select;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select).attrs({
  style: { width: '20rem' },
})`
  margin-bottom: 0.8rem;
`;

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
    <StyledWrapper>
      {lookupOptions && (
        <StyledSelect
          value={value?.lookup}
          defaultValue={defaultValue?.lookup}
          onChange={(value) => handleChoicedSelectChange(value.toString())}
        >
          {lookupOptions.map((option) => (
            <Option key={option.name} value={option.value}>
              <Typography.Text>{option.name}</Typography.Text>
            </Option>
          ))}
        </StyledSelect>
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
    </StyledWrapper>
  );
}
