import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';

import { setEndOfDay, setStartOfDay } from '@common/helpers';

import {
  DatePickerQuickButtonsProps,
  quickBtnValue2Name,
  quickBtnValue2StartDate,
  QuickButtonValues,
  QuickButtonValue,
} from './quick-buttons.types';

export default function DatePickerQuickButtons(
  props: DatePickerQuickButtonsProps
) {
  const { defaultQuickButtonValue, onChange } = props;

  const [selectedQuickButton, setSelectedQuickButton] =
    useState<QuickButtonValue>(defaultQuickButtonValue);

  const handleChoicedQuickButtonChange = (e: RadioChangeEvent) => {
    const { value } = e.target;

    setSelectedQuickButton(value);
    onChange([
      setStartOfDay(quickBtnValue2StartDate(value)),
      setEndOfDay(dayjs()),
    ]);
  };

  return (
    <Radio.Group
      value={selectedQuickButton}
      onChange={handleChoicedQuickButtonChange}
      style={{
        width: 'fit-content',
        marginBottom: '0.8rem',
      }}
    >
      {QuickButtonValues.map((value) => (
        <Radio.Button key={value} value={value} style={{ width: '4rem' }}>
          {quickBtnValue2Name(value)}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}
