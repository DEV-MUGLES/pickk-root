import styled from 'styled-components';
import { Table, Typography, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import { BoardTableProps } from './board-table.types';

const { Title } = Typography;

const StyledTableTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 6px 16px;
`;

const PAGE_SIZE = 20;

export default function BoardTable(props: BoardTableProps) {
  const { title, dataSource, onRefreshClick, onRowClick } = props;

  const renderTitle = () => {
    return (
      <StyledTableTitleWrapper>
        <Title level={5}>
          {title} 목록 (총 {dataSource.length} 개)
        </Title>
        <Button onClick={onRefreshClick} icon={<ReloadOutlined />}>
          새로고침
        </Button>
      </StyledTableTitleWrapper>
    );
  };

  return (
    <Table
      {...props}
      size="small"
      title={renderTitle}
      pagination={{ position: ['bottomCenter'], pageSize: PAGE_SIZE }}
      scroll={{ x: true }}
      onRow={(record) => {
        return {
          onClick: () => onRowClick(record),
        };
      }}
    />
  );
}
