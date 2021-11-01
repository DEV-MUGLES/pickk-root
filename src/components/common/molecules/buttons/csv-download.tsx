import ExcelDownloadButton, {
  ExcelDownloadButtonProps,
} from './excel-download';

export type CSVDownloadButtonProps = ExcelDownloadButtonProps;

export default function CSVDownloadButton(props: CSVDownloadButtonProps) {
  return (
    <ExcelDownloadButton
      {...props}
      options={{ extension: 'csv' }}
      buttonText="CSV 다운"
    />
  );
}
