import { useState } from 'react';
import { Button } from 'antd';

import { TableActionType, BoardTableActionsProps } from './actions.types';

export type BoardTableActionButtonProps = {
  action: TableActionType;
} & Pick<
  BoardTableActionsProps,
  'selectedRowKeys' | 'selectedRecords' | 'resetSelectedRowKeys' | 'reload'
>;

export default function BoardTableActionButton(
  props: BoardTableActionButtonProps
) {
  const {
    action,
    selectedRowKeys,
    selectedRecords,
    resetSelectedRowKeys,
    reload,
  } = props;

  const { text, onClick, Component, Modal } = action;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!!Component) {
    return <Component />;
  }

  const handleActionButtonClick = async () => {
    if (!!Modal) {
      openModal();
      return;
    }

    const result = await onClick(selectedRowKeys, selectedRecords);

    if (result === true) {
      resetSelectedRowKeys();
      reload();
    }
  };

  const handleModalOk = () => {
    closeModal();
    resetSelectedRowKeys();
    reload();
  };

  return (
    <>
      <Button
        onClick={handleActionButtonClick}
        disabled={selectedRowKeys.length === 0}
      >
        {text}
      </Button>
      {!!Modal && (
        <Modal
          visible={isModalOpen}
          selectedRowKeys={selectedRowKeys}
          selectedRecords={selectedRecords}
          onCancel={closeModal}
          onOk={handleModalOk}
        />
      )}
    </>
  );
}
