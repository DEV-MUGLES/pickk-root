import styled from 'styled-components';
import dayjs from 'dayjs';
import { Typography, Alert } from 'antd';
import { palette } from '@pickk/design-token';

import { useInquiryAnswers } from './hooks';

const { Text } = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAlert = styled(Alert).attrs({
  showIcon: true,
  type: 'warning',
})`
  margin-top: 1.6rem;
`;

const StyledAnswerCard = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid ${palette.gray2};
  padding: 1.2rem;
  margin-top: 0.8rem;
`;

const StyledText = styled.div`
  color: ${palette.gray5};
`;

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

  if (!answers?.length) {
    return null;
  }

  const renderAnswers = () => {
    return answers.map((answer) => {
      const { id, content, displayAuthor, createdAt } = answer;

      return (
        <StyledAnswerCard key={id}>
          <Text>{content}</Text>
          <StyledText>
            {getCreatedAtText(createdAt)} {displayAuthor}
          </StyledText>
        </StyledAnswerCard>
      );
    });
  };

  return (
    <>
      <StyledWrapper>
        <StyledAlert
          message={`기존 답변에 추가적인 답변으로 등록됩니다. (이미 등록된 답변 개수: ${answers.length})`}
        />
        {renderAnswers()}
      </StyledWrapper>
    </>
  );
}
