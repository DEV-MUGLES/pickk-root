import { PageInput } from '@pickk/common';

import {
  BoardFilterProps,
  BoardTableProps,
} from '@components/common/organisms';
import { ColumnsType } from 'antd/lib/table';

export type BoardDataFetcher<
  DataType = object,
  FilterType = Record<string, unknown>
> = ({ pageInput, filter }: { pageInput: PageInput; filter?: FilterType }) => {
  data: DataType[];
  total: number;
  loading: boolean;
  refetch: () => Promise<unknown>;
};

export type BoardTemplateProps<DataType = any> = {
  title: string;
  subTitle: string;
  useBoardData: BoardDataFetcher;
  tableColumns: ColumnsType<DataType>;
  filterInputs?: BoardFilterProps['inputs'];
  /** @default 20 */
  defaultPageSize?: number;
} & Pick<BoardFilterProps, 'defaultFilter'> &
  Pick<
    BoardTableProps,
    'onRowClick' | 'selectedRowKeys' | 'onRowSelectionChange'
  >;
