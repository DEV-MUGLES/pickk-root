import { Key } from 'react';
import { TableProps } from 'antd';
import { PageInput } from '@pickk/common';

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
  /** @default 20 */
  defaultPageSize?: number;
  selectedRowKeys?: Key[];
  onRowSelectionChange?: (selectedRowKeys: Key[]) => void;
  onRowClick?: (record: DataType) => void;
};

export type BoardTableHandle = { reload: () => void };
