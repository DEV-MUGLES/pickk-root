import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Modal, Input, Button, Typography, message } from 'antd';
import { InquiryAnswer } from '@pickk/common';

import { useUpdateInquiryAnswer } from './hooks';

const { Text } = Typography;
const { TextArea } = Input;

const SyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 0.4rem;
  margin-bottom: 1.2rem;
`;

const StyledText = styled(Text)`
  margin-right: 0.8rem;

  white-space: nowrap;
`;

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
      <SyledRow>
        <StyledText>작성자 : </StyledText>
        <Input value={displayAuthor} onChange={handleDisplayAuthorChange} />
      </SyledRow>
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
