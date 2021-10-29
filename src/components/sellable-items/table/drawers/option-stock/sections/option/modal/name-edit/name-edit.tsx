import { ChangeEvent, useState } from 'react';
import { Input, message, Modal } from 'antd';

import { useUpdateItemOption } from './hooks';

export type OptionNameEditModalProps = {
  optionId: number;
  visible: boolean;
  onClose: () => void;
};

function OptionNameEditModal({
  optionId,
  visible,
  onClose,
}: OptionNameEditModalProps) {
  const [name, setName] = useState<string>();
  const { updateRootItemOption: updateItemOption } = useUpdateItemOption();

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const handleOk = async () => {
    try {
      await updateItemOption(optionId, name);

      message.success('옵션명을 변경했습니다.');
      onClose();
    } catch (err) {
      message.error('저장에 실패했습니다. err - ' + err);
    }
  };

  return (
    <Modal
      title="옵션명 수정"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      cancelText="취소"
      okText="저장"
    >
      <Input
        value={name}
        onChange={handleChange}
        placeholder="변경할 옵션명을 입력해주세요."
      />
    </Modal>
  );
}

export default OptionNameEditModal;
