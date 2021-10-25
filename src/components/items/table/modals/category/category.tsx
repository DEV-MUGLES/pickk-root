import React, { useState } from 'react';
import { message, Modal } from 'antd';

import { ItemCategoryCascader } from '@components/common/molecules/form-inputs';

import { useUpdateItemCategory } from './hooks';

export type CategoryModalProps = {
  visible: boolean;
  onClose: () => void;
  itemId: number;
  defaultCategory: {
    majorCategoryId: number;
    minorCategoryId: number;
  };
};

function CategoryModal({
  visible,
  onClose,
  itemId,
  defaultCategory,
}: CategoryModalProps) {
  const [values, setValues] = useState<[number, number]>([
    defaultCategory?.majorCategoryId,
    defaultCategory?.minorCategoryId,
  ]);
  const { updateItemCategory } = useUpdateItemCategory();

  const handleOk = async () => {
    try {
      const [majorCategoryId, minorCategoryId] = values;

      await updateItemCategory(itemId, majorCategoryId, minorCategoryId);
      message.success('카테고리가 변경되었습니다.');
      onClose();
    } catch (error) {
      message.error('실패했습니다. err - ' + error);
    }
  };

  return (
    <Modal
      title="카테고리 설정"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
    >
      <ItemCategoryCascader value={values} onChange={setValues} />
    </Modal>
  );
}

export default CategoryModal;
