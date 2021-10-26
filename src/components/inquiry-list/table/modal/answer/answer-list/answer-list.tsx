import { useState } from 'react';
import dayjs from 'dayjs';
import { Typography, Alert, Button } from 'antd';
import { palette } from '@pickk/design-token';

import InquiryAnswerUpdateModal from './update-modal';

import { InquiryAnswerDataType, useInquiryAnswers } from './hooks';

const { Paragraph } = Typography;

type InquiryAnswerModalAnswerListProps = {
  id: number;
};

const getCreatedAtText = (createdAt: Date) => {
  return `${dayjs(createdAt).format('YYYY.MM.DD hh:mm')} (
    ${dayjs(createdAt).fromNow()})`;
};

export default function InquiryAnswerModalAnswerList({
  id,
}: InquiryAnswerModalAnswerListProps) {
  const { data: answers } = useInquiryAnswers(id);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] =
    useState<InquiryAnswerDataType>(null);

  if (!answers?.length) {
    return null;
  }

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleUpdateClick = (answer: InquiryAnswerDataType) => () => {
    setSelectedAnswer(answer);
    setIsModalVisible(true);
  };

  const renderAnswers = () => {
    return answers.map((answer) => {
      const { id, content, displayAuthor, createdAt } = answer;

      return (
        <div
          key={id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${palette.gray2}`,
            padding: '1.2rem',
            marginTop: '0.8rem',
          }}
        >
          <Paragraph style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {content}
          </Paragraph>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {getCreatedAtText(createdAt)} {displayAuthor}
            </div>
            <Button onClick={handleUpdateClick(answer)}>수정</Button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Alert
          type="warning"
          message={`기존 답변에 추가적인 답변으로 등록됩니다. (이미 등록된 답변 개수: ${answers.length})`}
          showIcon
          style={{ marginTop: '1.6rem' }}
        />
        {renderAnswers()}
      </div>
      {isModalVisible && (
        <InquiryAnswerUpdateModal
          visible={isModalVisible}
          onClose={handleModalClose}
          answer={selectedAnswer}
        />
      )}
    </>
  );
}
