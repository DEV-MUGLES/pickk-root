import styled from 'styled-components';
import { Table, Typography, Button } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { ReloadOutlined } from '@ant-design/icons';
import { palette } from '@pickk/design-token';

import { BoardTableProps } from './board-table.types';

const { Title } = Typography;

const StyledWrapper = styled.div`
  padding: 0.4rem 0;

  background-color: ${palette.white};
`;

const StyledTableTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 0.8rem;
`;

export default function BoardTable(props: BoardTableProps) {
  const {
    title,
    dataSource,
    totalDataSize,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onRefreshClick,
    onRowClick = () => null,
    selectedRowKeys,
    onRowSelectionChange,
  } = props;

  const renderTitle = () => {
    return (
      <StyledTableTitleWrapper>
        <Title level={5}>
          {title} 목록 (총 {totalDataSize} 개)
        </Title>
        <Button onClick={() => onRefreshClick()} icon={<ReloadOutlined />}>
          새로고침
        </Button>
      </StyledTableTitleWrapper>
    );
  };

  const rowSelection: TableRowSelection<unknown> = {
    selectedRowKeys,
    onChange: onRowSelectionChange,
  };

  return (
    <StyledWrapper>
      <Table
        {...props}
        {...(selectedRowKeys != null ? { rowSelection } : {})}
        dataSource={dataSource.map((v) => ({ ...v, key: v.id }))}
        size="small"
        title={renderTitle}
        pagination={{
          total: totalDataSize,
          current: page,
          pageSize,
          position: ['bottomCenter'],
          onChange: onPageChange,
          onShowSizeChange: (_, size) => onPageSizeChange(size),
        }}
        scroll={{ x: true }}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </StyledWrapper>
  );
}
