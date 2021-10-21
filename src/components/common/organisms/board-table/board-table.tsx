import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
} from 'react';
import styled from 'styled-components';
import { Table, Typography, Button } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { ReloadOutlined } from '@ant-design/icons';
import { palette } from '@pickk/design-token';

import { BoardTableProps, BoardTableHandle } from './board-table.types';

const { Title } = Typography;

const StyledTable = styled(Table)`
  padding: 0.4rem 0;

  background-color: ${palette.white};
`;

const StyledTableTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0 0.8rem;
`;

const DEFAULT_PAGE_SIZE = 20;

const BoardTable = forwardRef<BoardTableHandle, BoardTableProps>(
  (props: BoardTableProps, ref: Ref<BoardTableHandle>) => {
    const {
      title,
      useTableData,
      filter,
      query,
      defaultPageSize = DEFAULT_PAGE_SIZE,
      onRowClick = () => null,
      selectedRowKeys,
      onRowSelectionChange,
    } = props;

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    useEffect(() => {
      /** 필터가 바뀔 때 page를 1로 초기화한다. */
      setPage(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(filter)]);

    const {
      data = [],
      total,
      loading,
      refetch,
    } = useTableData({
      pageInput: {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      },
      ...(query ? { query } : {}),
      ...(filter ? { filter } : {}),
    });

    const reload = async () => {
      await refetch();
    };

    useImperativeHandle(ref, () => ({
      reload,
    }));

    const renderTitle = () => {
      return (
        <StyledTableTitleWrapper>
          <Title level={5}>
            {title} 목록 (총 {total} 개)
          </Title>
          <Button onClick={reload} icon={<ReloadOutlined />}>
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
      <StyledTable
        {...props}
        {...(selectedRowKeys != null ? { rowSelection } : {})}
        title={renderTitle}
        dataSource={data.map((v) => ({ ...v, key: v.id }))}
        loading={loading}
        pagination={{
          total,
          current: page,
          pageSize,
          position: ['bottomCenter'],
          onChange: setPage,
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        size="small"
        scroll={{ x: true }}
      />
    );
  }
);

export default BoardTable;
