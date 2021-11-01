import { useState, ChangeEvent } from 'react';
import { Modal, Input, Button, Typography, message } from 'antd';
import { InquiryAnswer } from '@pickk/common';

import { useUpdateInquiryAnswer } from '../hooks';

import styles from './update-modal.module.scss';

const { Text } = Typography;
const { TextArea } = Input;

export type InquiryAnswerUpdateModalProps = {
  visible: boolean;
  onClose: () => void;
  answer: Pick<InquiryAnswer, 'id' | 'content' | 'displayAuthor'>;
};

export default function InquiryAnswerUpdateModal(
  props: InquiryAnswerUpdateModalProps
) {
  const { visible, onClose, answer } = props;

  const [content, setContent] = useState(answer?.content ?? '');
  const [displayAuthor, setDisplayAuthor] = useState(
    answer?.displayAuthor ?? ''
  );

  const { updateInquiryAnswer } = useUpdateInquiryAnswer();

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDisplayAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayAuthor(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await updateInquiryAnswer(answer.id, content, displayAuthor);

      onClose();
    } catch (err) {
      message.error('실패했습니다. err - ' + err);
    }
  };

  if (!answer) {
    return null;
  }

  return (
    <Modal title="답변 수정" visible={visible} footer={null} onCancel={onClose}>
      <TextArea value={content} onChange={handleContentChange} />
      <div className={styles.inputWrapper}>
        <Text className={styles.label}>작성자 :</Text>
        <Input value={displayAuthor} onChange={handleDisplayAuthorChange} />
      </div>
      <Button
        type="primary"
        disabled={!content || !displayAuthor}
        onClick={handleSubmit}
      >
        저장
      </Button>
    </Modal>
  );
}
