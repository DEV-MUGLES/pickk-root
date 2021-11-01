import { ChangeEvent, useState } from 'react';
import { Typography, Divider, Input, Button, message } from 'antd';
import { Inquiry } from '@pickk/common';

import InquiryAnswerCard from './card';
import InquiryAnswerUpdateModal from './update-modal';

import {
  useInquiryAnswers,
  useAnswerInquiry,
  InquiryAnswerDataType,
} from './hooks';

import styles from './answer.module.scss';

const { Text, Title } = Typography;
const { TextArea } = Input;

const AnswerButton = (props: { disabled: boolean; onClick: () => void }) => (
  <Button
    type="primary"
    style={{ height: '100%', marginLeft: '0.4rem' }}
    {...props}
  >
    답변하기
  </Button>
);

type InquiryDetailAnswerSectionProps = Pick<Inquiry, 'id'>;

export default function InquiryDetailAnswerSection(
  props: InquiryDetailAnswerSectionProps
) {
  const { id: inquiryId } = props;

  const { data: answers = [], refetch: reload } = useInquiryAnswers(inquiryId);
  const { answerInquiry } = useAnswerInquiry();

  const [content, setContent] = useState('');
  const [displayAuthor, setDisplayAuthor] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] =
    useState<InquiryAnswerDataType>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDisplayAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayAuthor(e.target.value);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAnswerButtonClick = async () => {
    try {
      await answerInquiry(inquiryId, content, displayAuthor);

      message.success('답변이 등록되었습니다.');

      reload();
      setContent('');
      setDisplayAuthor('');
    } catch (err) {
      message.success('실패했습니다. err - ' + err);
    }
  };

  const handleUpdateInquiryAnswer =
    (answer: InquiryAnswerDataType) => async () => {
      setSelectedAnswer(answer);
      setIsModalVisible(true);
    };

  const renderAnswers = () => {
    if (!answers?.length) {
      return <Text>등록된 답변이 없습니다</Text>;
    }

    return answers.map((answer, index) => (
      <>
        {index !== 0 && <Divider style={{ margin: '0.8rem 0' }} />}
        <InquiryAnswerCard
          {...answer}
          onUpdateClick={handleUpdateInquiryAnswer(answer)}
        />
      </>
    ));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Title level={5}>문의 답변 ({answers.length} 개)</Title>
        <div className={styles.answer}>{renderAnswers()}</div>
        <div className={styles.row}>
          <TextArea value={content} onChange={handleContentChange} />
          <AnswerButton
            disabled={!content || !displayAuthor}
            onClick={handleAnswerButtonClick}
          />
        </div>
        <div className={styles.row}>
          <Text>작성자: </Text>
          <Input value={displayAuthor} onChange={handleDisplayAuthorChange} />
        </div>
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
