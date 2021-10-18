import { Key } from 'react';
import { TableProps } from 'antd';

export type BoardTableProps<DataType = object & { id?: Key }> = Pick<
  TableProps<DataType>,
  'dataSource' | 'loading' | 'columns'
> & {
  title: string;
  totalDataSize: number;
  page: number;
  pageSize: number;
  defaultPageSize?: number;
  selectedRowKeys?: Key[];
  onRefreshClick: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRowClick?: (record: DataType) => void;
  onRowSelectionChange?: (selectedRowKeys: Key[]) => void;
};
