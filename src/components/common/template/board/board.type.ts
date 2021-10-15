import {
  BoardFilterProps,
  BoardTableProps,
} from '@components/common/organisms';
import { ColumnsType } from 'antd/lib/table';

export type BoardDataFetcher<
  DataType = object,
  FilterType = Record<string, unknown>
> = ({ filter }: { filter?: FilterType }) => {
  data: DataType[];
  loading: boolean;
  refetch: () => Promise<unknown>;
};

export type BoardTemplateProps<DataType = any> = {
  title: string;
  subTitle: string;
  useBoardData: BoardDataFetcher;
  tableColumns: ColumnsType<DataType>;
  filterInputs?: BoardFilterProps['inputs'];
} & Pick<BoardFilterProps, 'defaultFilter'> &
  Pick<
    BoardTableProps,
    'onRowClick' | 'selectedRowKeys' | 'onRowSelectionChange'
  >;
