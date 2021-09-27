import { ElementType } from 'react';

export type BoardFilterInputType = {
  name: string;
  label: string;
  /** prop으로 value, onChange를 포함하고 있어야 정상작동한다.
   * prop으로 defaultValue를 포함해야 defaultFilter가 정상작동한다.*/
  Component: ElementType;
};

export type BoardFilterProps<FilterType = Record<string, unknown>> = {
  defaultFilter?: FilterType;
  onFilterChange: (filter: FilterType) => void;
  inputs: BoardFilterInputType[];
};
