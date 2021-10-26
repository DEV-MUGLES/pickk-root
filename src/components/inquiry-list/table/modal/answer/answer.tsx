import { ChangeEvent, useState, useEffect } from 'react';
import { Modal, Input, Typography, message } from 'antd';

import { useMe } from '@common/hooks';

import AnswerList from './answer-list';

import { useAnswerInquiry } from './hooks';

import styles from './answer.module.scss';

const { Text } = Typography;
const { TextArea } = Input;

export type InquiryAnswerModalProps = {
  visible: boolean;
  onClose: () => void;
  inquiryId: number;
};

export default function InquiryAnswerModal(props: InquiryAnswerModalProps) {
  const { visible, onClose, inquiryId } = props;

  const [content, setContent] = useState('');
  const [displayAuthor, setDisplayAuthor] = useState('');

  const { answerInquiry } = useAnswerInquiry();
  const { data: me } = useMe();

  useEffect(() => {
    if (!me) {
      return;
    }
    setDisplayAuthor(me.name);
  }, [me]);

  const answer = async () => {
    if (!content) {
      message.warning(`답변을 입력해주세요`);
      return;
    }

    if (!displayAuthor) {
      message.warning(`담당자명을 입력해주세요`);
      return;
    }

    try {
      await answerInquiry(inquiryId, content, displayAuthor);

      message.success('답변이 정상적으로 등록되었습니다.');

      setContent('');
      setDisplayAuthor('');
      onClose();
    } catch (err) {
      message.error(`답변 등록에 실패 했습니다. ${err}`);
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDisplayAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayAuthor(e.target.value);
  };

  return (
    <Modal visible={visible} onOk={answer} onCancel={onClose} title="답변달기">
      <TextArea value={content} onChange={handleContentChange} />
      <div className={styles.row}>
        <Text>담당자명: </Text>
        <Input
          className={styles.input}
          value={displayAuthor}
          onChange={handleDisplayAuthorChange}
        />
      </div>
      <AnswerList id={inquiryId} />
    </Modal>
  );
}
