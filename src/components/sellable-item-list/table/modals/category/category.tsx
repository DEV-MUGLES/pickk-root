import React, { useState } from 'react';
import { message, Modal } from 'antd';

import ItemCategoryCascader from '@components/common/molecules/form-inputs/item-category-cascader';

import { useUpdateItemCategory } from './hooks';

export type CategoryModalProps = {
  visible: boolean;
  itemId: number;
  defaultValue?: number[];
  onClose: () => void;
};

function CategoryModal({
  visible,
  itemId,
  defaultValue,
  onClose,
}: CategoryModalProps) {
  const [values, setValues] = useState<number[]>(defaultValue);
  const { updateItemCategory } = useUpdateItemCategory();

  const handleOk = async () => {
    try {
      const [majorCategoryId, minorCategoryId] = values;
      await updateItemCategory(itemId, majorCategoryId, minorCategoryId);
      message.success('카테고리가 변경되었습니다.');
    } catch (error) {
      message.error('실패했습니다. err - ' + error);
    }

    onClose();
  };

  return (
    <Modal
      title="카테고리 설정"
      visible={visible}
      onCancel={() => {
        onClose();
      }}
      onOk={handleOk}
    >
      <ItemCategoryCascader
        value={values}
        onChange={setValues as (value: (number | string)[]) => void}
        defaultValue={defaultValue}
      />
    </Modal>
  );
}

export default CategoryModal;
