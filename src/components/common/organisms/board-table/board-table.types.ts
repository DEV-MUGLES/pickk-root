import { Key } from 'react';
import { TableProps } from 'antd';
import { PageInput } from '@pickk/common';

import { TableActionType } from './actions';

export type BoardTableDataFetcher<
  DataType = object,
  FilterType = Record<string, unknown>
> = ({
  pageInput,
  filter,
  query,
}: {
  pageInput: PageInput;
  filter?: FilterType;
  query?: string;
}) => {
  data: DataType[];
  total: number;
  loading: boolean;
  refetch: () => Promise<unknown>;
};

export type BoardTableProps<
  DataType = object & { id?: Key },
  FilterType = Record<string, unknown>
> = Pick<TableProps<DataType>, 'columns'> & {
  title: string;
  useTableData: BoardTableDataFetcher<DataType, FilterType>;
  filter?: FilterType;
  query?: string;
  actions?: TableActionType[];
  /** @default 20 */
  defaultPageSize?: number;
  onRowClick?: (record: DataType) => void;
};

export type BoardTableHandle = { reload: () => void };
