import { Key } from 'react';
import { TableProps } from 'antd';

export type BoardTableProps<DataType = object & { id?: Key }> = Pick<
  TableProps<DataType>,
  'dataSource' | 'loading' | 'columns'
> & {
  title: string;
  selectedRowKeys?: Key[];
  onRefreshClick: () => void;
  onRowClick?: (record: DataType) => void;
  onRowSelectionChange?: (selectedRowKeys: Key[]) => void;
};
