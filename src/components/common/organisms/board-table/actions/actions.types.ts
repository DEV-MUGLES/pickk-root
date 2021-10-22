import { ModalProps } from 'antd';
import { Key } from 'react';

export type TableActionType<DataType = unknown> = {
  text?: string;
  onClick?: (
    selectedRowKeys?: Key[],
    selectedRecords?: DataType[]
  ) => Promise<boolean | void>;
  Component?: React.FunctionComponent<unknown>;
  Modal?: React.FunctionComponent<
    Pick<ModalProps, 'visible' | 'onCancel' | 'onOk'> & {
      selectedRowKeys?: Key[];
      selectedRecords?: DataType[];
    }
  >;
};

export type BoardTableActionsProps<DataType = unknown> = {
  actions: TableActionType[];
  selectedRowKeys: Key[];
  selectedRecords: DataType[];
  resetSelectedRowKeys: () => void;
  reload: () => void;
};
