import dayjs from 'dayjs';
import { Typography, Button } from 'antd';
import { InquiryAnswer } from '@pickk/common';

import styles from './answer.module.scss';

const { Text } = Typography;

const getCreatedAtText = (createdAt: Date) => {
  return `${dayjs(createdAt).format('YYYY.MM.DD hh:mm')} (${dayjs(
    createdAt
  ).fromNow()})`;
};

type InquiryAnswerCardProps = Pick<
  InquiryAnswer,
  'id' | 'content' | 'displayAuthor' | 'createdAt'
> & {
  onUpdateClick: () => void;
};

export default function InquiryAnswerCard(props: InquiryAnswerCardProps) {
  const { id, content, createdAt, displayAuthor, onUpdateClick } = props;

  return (
    <div key={id} className={styles.cardWrapper}>
      <Text
        style={{
          marginBottom: '0.4rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
      >
        {content}
      </Text>
      <div className={styles.row}>
        <Text>
          {getCreatedAtText(createdAt)} {displayAuthor}
        </Text>
        <Button onClick={onUpdateClick}>수정</Button>
      </div>
    </div>
  );
}
