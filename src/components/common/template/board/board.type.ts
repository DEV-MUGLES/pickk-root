import { PageHeaderProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export type BoardDataFetcher<
  DataT = object,
  FilterT = Record<string, unknown>
> = ({ filter }: { filter?: FilterT }) => {
  data: DataT[];
  loading: boolean;
  refetch: () => Promise<void>;
};

export type BoardTemplateProps = Pick<PageHeaderProps, 'title' | 'subTitle'> & {
  useBoardData: BoardDataFetcher;
  tableColumns: ColumnsType<any>;
  filter?: Record<string, unknown>;
  filterInputs?: any; // @TODO
};
