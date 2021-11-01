import { Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import {
  ExcelDownloadButton as _ExcelDownloadButton,
  ExcelDownloadButtonProps as _ExcelDownloadButtonProps,
  formatTable,
  ExcelColumnsType,
} from '@pickk/react-excel';

export type ExcelDownloadButtonProps = {
  title: string;
  dataSource: unknown[];
  columns: ExcelColumnsType<unknown>;
  buttonText?: string;
} & Pick<_ExcelDownloadButtonProps, 'options'>;

export default function ExcelDownloadButton({
  title,
  dataSource = [],
  columns,
  options,
  buttonText = '엑셀 다운',
}: ExcelDownloadButtonProps) {
  const excelData = formatTable(dataSource, columns);
  const fileName = `[핔]${title.replace(' ', '')}`;

  return (
    <_ExcelDownloadButton
      fileName={fileName}
      data={excelData}
      options={{ ...options, isNameHasDateTime: true }}
      element={
        <Button
          icon={<FileExcelOutlined />}
          style={{ color: 'green', borderColor: 'green' }}
        >
          {buttonText}
        </Button>
      }
    />
  );
}
