import { Ref } from 'react';

import {
  BoardFilterProps,
  BoardTableProps,
} from '@components/common/organisms';

import { BoardTableHandle } from '@components/common/organisms/board-table';

export type BoardTemplateProps<
  DataType = any,
  FilterType = Record<string, unknown>
> = {
  title: string;
  subTitle: string;
  filterInputs?: BoardFilterProps['inputs'];
  tableRef?: Ref<BoardTableHandle>;
} & Pick<BoardFilterProps, 'defaultFilter'> &
  Pick<
    BoardTableProps<DataType, FilterType>,
    | 'useTableData'
    | 'onRowClick'
    | 'selectedRowKeys'
    | 'onRowSelectionChange'
    | 'columns'
    | 'defaultPageSize'
  >;
