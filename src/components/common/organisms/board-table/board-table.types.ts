import { TableProps } from 'antd';

export type BoardTableProps<DataType = object> = Pick<
  TableProps<DataType>,
  'dataSource' | 'loading' | 'columns'
> & {
  title: string;
  onRefreshClick: () => void;
  onRowClick: (record: DataType) => void;
};
