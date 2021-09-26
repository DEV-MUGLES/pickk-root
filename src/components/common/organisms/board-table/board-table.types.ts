import { TableProps } from 'antd';

export type BoardTableProps<DataT = object> = Pick<
  TableProps<DataT>,
  'dataSource' | 'loading' | 'columns'
> & {
  title: string;
  onRefreshClick: () => void;
  onRowClick: (record: DataT) => void;
};
