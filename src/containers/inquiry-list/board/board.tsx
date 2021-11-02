import { useState } from 'react';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { BoardTemplate } from '@components/common/templates';
import { InquiryAnswerModal } from '@components/inquiry-list/table/modal';

import {
  inquiriesColumns,
  inquiryListFilterInputs,
} from '@components/inquiry-list';

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
        <Space direction="vertical">
          <Button onClick={handleAnswerClick(record)}>답변달기</Button>
          <Button href={`/inquiries/${record.id}`} target="_blank">
            상세보기
          </Button>
        </Space>
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
        useTableData={useInquiries}
        columns={newInquiriesColumns}
        filterInputs={inquiryListFilterInputs}
      />
      {!!selectedRecord && isModalVisible && (
        <InquiryAnswerModal
          visible={isModalVisible}
          onClose={handleModalClose}
          inquiryId={selectedRecord.id}
        />
      )}
    </>
  );
}
