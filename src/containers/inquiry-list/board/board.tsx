import { useState } from 'react';
import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { BoardTemplate } from '@components/common/template';
import { InquiryAnswerModal } from '@components/inquiry-list/table/modal';

import { inquiriesColumns } from '@components/inquiry-list';

import { useInquiries, InquiryDataType } from './hooks';

export default function InquiryListBoardContainer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<InquiryDataType>(null);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAnswerClick = (record: InquiryDataType) => () => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const newInquiriesColumns: ColumnsType<InquiryDataType> = [
    inquiriesColumns[0],
    {
      title: '',
      dataIndex: 'answer',
      key: 'answer',
      render: (_, record) => (
        <Button onClick={handleAnswerClick(record)}>답변달기</Button>
      ),
      width: 60,
      ellipsis: true,
    },
    ...inquiriesColumns.slice(1),
  ];

  return (
    <>
      <BoardTemplate
        title="문의내역"
        subTitle="문의내역입니다."
        useBoardData={useInquiries}
        tableColumns={newInquiriesColumns}
      />
      {!!selectedRecord && isModalVisible && (
        <InquiryAnswerModal
          visible={isModalVisible}
          onClose={handleModalClose}
          inquiryId={selectedRecord.id}
          answers={selectedRecord.answers}
        />
      )}
    </>
  );
}
