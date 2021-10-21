import { Dayjs } from 'dayjs';

import { FormInputProps } from '../form-input.types';

import { QuickButtonValue } from './quick-buttons';

export type DatePickerValueType = {
  lookup: string;
  range: [Dayjs, Dayjs];
};

export type DatePickerProps = FormInputProps<DatePickerValueType> & {
  lookupOptions?: Array<{ name: string; value: string }>;
  /** @default 'oneMonth' */
  defaultQuickButtonValue?: QuickButtonValue;
};
