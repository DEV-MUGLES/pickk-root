import styled from 'styled-components';
import dayjs from 'dayjs';
import { Typography } from 'antd';
import { palette } from '@pickk/design-token';
import { InquiryAnswer } from '@pickk/common';

const { Text } = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  answers?: Pick<
    InquiryAnswer,
    'id' | 'content' | 'displayAuthor' | 'createdAt'
  >[];
};

const getCreatedAtText = (createdAt: Date) => {
  return `${dayjs(createdAt).format('YYYY.MM.DD hh:mm')} (
    ${dayjs(createdAt).fromNow()})`;
};

export default function InquiryAnswerModalAnswerList({
  answers,
}: InquiryAnswerModalAnswerListProps) {
  if (!answers?.length) {
    return null;
  }

  const renderAnswers = () => {
    return answers.map(({ id, content, displayAuthor, createdAt }) => (
      <StyledAnswerCard key={id}>
        <Text>{content}</Text>
        <StyledText>
          {getCreatedAtText(createdAt)} {displayAuthor}
        </StyledText>
      </StyledAnswerCard>
    ));
  };

  return <StyledWrapper>{renderAnswers()}</StyledWrapper>;
}
