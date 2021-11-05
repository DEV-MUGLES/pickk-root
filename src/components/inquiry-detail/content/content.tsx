import dayjs from 'dayjs';
import { Typography, Divider } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { palette } from '@pickk/design-token';
import { Inquiry, User } from '@pickk/common';

import { getInquiryTypeDisplayName } from '@src/common/helpers';

import styles from './content.module.scss';

const { Text, Title } = Typography;

const StyledIsAnswered = ({ isAnswered }: { isAnswered: boolean }) => (
  <Text strong style={{ color: isAnswered ? palette.blue : palette.orange6 }}>
    {isAnswered ? '답변완료' : '미답변'}
  </Text>
);

const StyledLockOutlined = () => (
  <LockOutlined style={{ marginLeft: '0.4rem', color: palette.gray3 }} />
);

const getCreatedAtText = (createdAt: Date) => {
  return `${dayjs(createdAt).format('YYYY.MM.DD hh:mm')} (${dayjs(
    createdAt
  ).fromNow()})`;
};

type InquiryDetailContentSectionProps = Pick<
  Inquiry,
  'isAnswered' | 'isSecret' | 'type' | 'title' | 'content' | 'createdAt'
> & {
  user: Pick<User, 'id' | 'nickname' | 'oauthProvider' | 'oauthCode'>;
};

export default function InquiryDetailContentSection(
  props: InquiryDetailContentSectionProps
) {
  const { isAnswered, isSecret, type, title, content, createdAt, user } = props;

  return (
    <div className={styles.wrapper}>
      <Title level={5}>문의 내용</Title>
      <section>
        <StyledIsAnswered isAnswered={isAnswered} />
        <Text strong>
          [{getInquiryTypeDisplayName(type)}문의] {title}
          {isSecret && <StyledLockOutlined />}
        </Text>
        <Text>{content}</Text>
        <Divider />
        <Text>작성일시: {getCreatedAtText(createdAt)}</Text>
        <Text>작성자(닉네임): {user.nickname}</Text>
        <Text>
          작성자 치트로그인 정보: {user.oauthProvider} / {user.oauthCode}
        </Text>
      </section>
    </div>
  );
}
