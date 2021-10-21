import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { setEndOfDay, setStartOfDay } from '@common/helpers';

import {
  DatePickerQuickButtonsProps,
  quickBtnValue2Name,
  quickBtnValue2StartDate,
  QuickButtonValues,
  QuickButtonValue,
} from './quick-buttons.types';

const StyledRadioGroup = styled(Radio.Group)`
  width: fit-content;
  margin-bottom: 0.8rem;
`;

const StyledRadioButton = styled(Radio.Button).attrs({
  style: { width: '4rem' },
})``;

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
    <StyledRadioGroup
      value={selectedQuickButton}
      onChange={handleChoicedQuickButtonChange}
    >
      {QuickButtonValues.map((value) => (
        <StyledRadioButton key={value} value={value}>
          {quickBtnValue2Name(value)}
        </StyledRadioButton>
      ))}
    </StyledRadioGroup>
  );
}
