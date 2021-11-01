import {ColumnsType} from 'antd/lib/table';
import {ExcelColumnsType, CellType} from '@pickk/react-excel';

export const generateExcelColumns = <TData = Record<string, unknown>>(
  tableColumns: ColumnsType<TData>,
  valueMappers: Record<string, (record: TData) => CellType>,
  exclusions: string[] = [],
): ExcelColumnsType<TData> => {
  return tableColumns.reduce((acc, {title, key}) => {
    if (exclusions.includes(key.toString())) {
      return acc;
    }

    return [
      ...acc,
      {
        label: title.toString(),
        propName: key.toString(),
        ...(valueMappers[key.toString()]
          ? {mapValue: valueMappers[key.toString()]}
          : {}),
      },
    ];
  }, []);
};
