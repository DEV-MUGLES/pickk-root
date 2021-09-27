import { BoardFilterProps } from '@components/common/organisms';
import { ColumnsType } from 'antd/lib/table';

export type BoardDataFetcher<
  DataType = object,
  FilterType = Record<string, unknown>
> = ({ filter }: { filter?: FilterType }) => {
  data: DataType[];
  loading: boolean;
  refetch: () => Promise<void>;
};

export type BoardTemplateProps<DataType = any> = {
  title: string;
  subTitle: string;
  useBoardData: BoardDataFetcher;
  tableColumns: ColumnsType<DataType>;
  onRowClick?: (record: DataType) => void;
  filterInputs?: BoardFilterProps['inputs'];
} & Pick<BoardFilterProps, 'defaultFilter'>;
