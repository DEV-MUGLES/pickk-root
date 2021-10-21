import dayjs, {Dayjs} from 'dayjs';

export const QuickButtonValues = [
  'today',
  'oneWeek',
  'oneMonth',
  'threeMonth',
  'sixMonth',
] as const;
export type QuickButtonValue = typeof QuickButtonValues[number];
export const quickBtnValue2Name = (value: QuickButtonValue): string =>
  ({
    today: '오늘',
    oneWeek: '1주일',
    oneMonth: '1개월',
    threeMonth: '3개월',
    sixMonth: '6개월',
  }[value]);
export const quickBtnValue2StartDate = (value: QuickButtonValue): Dayjs =>
  ({
    today: dayjs(),
    oneWeek: dayjs().subtract(1, 'week'),
    oneMonth: dayjs().subtract(1, 'month'),
    threeMonth: dayjs().subtract(3, 'month'),
    sixMonth: dayjs().subtract(6, 'month'),
  }[value]);

export type DatePickerQuickButtonsProps = {
  defaultQuickButtonValue: QuickButtonValue;
  onChange: (value: [Dayjs, Dayjs]) => void;
};
