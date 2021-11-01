import { useState } from 'react';
import { Typography, Button, Space } from 'antd';
import { FileExcelOutlined, ReloadOutlined } from '@ant-design/icons';

import BoardDataExportModal from './data-export-modal';

import { BoardTableProps } from './board-table.types';

const { Title } = Typography;

export type BoardTableHeaderProps = {
  total: number;
  onRefreshClick: () => void;
  useExcelData?: () => { data: object[]; loading: boolean };
} & Pick<BoardTableProps, 'title' | 'excelColumns'>;

export default function BoardTableHeader(props: BoardTableHeaderProps) {
  const { title, total, onRefreshClick, useExcelData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title level={5}>
          {title} 목록 (총 {total} 개)
        </Title>
        <Space>
          <Button onClick={onRefreshClick} icon={<ReloadOutlined />}>
            새로고침
          </Button>
          {!!useExcelData && (
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={<FileExcelOutlined />}
            >
              파일로 내보내기
            </Button>
          )}
        </Space>
      </div>
      {isModalOpen && (
        <BoardDataExportModal
          {...props}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
