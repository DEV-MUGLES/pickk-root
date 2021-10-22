import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  Key,
} from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { palette } from '@pickk/design-token';

import BoardTableHeader from './header';
import BoardTableActions from './actions/actions';

import { BoardTableProps, BoardTableHandle } from './board-table.types';

const StyledTable = styled(Table)`
  padding: 0.4rem 0;

  background-color: ${palette.white};
`;

const StyledTableTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

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
      actions,
      defaultPageSize = DEFAULT_PAGE_SIZE,
      onRowClick = () => null,
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

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const selectedRecords = data.filter((record) =>
      selectedRowKeys.includes(record['id'])
    );

    const reload = async () => {
      await refetch();
    };

    useImperativeHandle(ref, () => ({
      reload,
    }));

    const renderTitle = () => {
      return (
        <StyledTableTitleWrapper>
          <BoardTableHeader
            title={title}
            total={total}
            onRefreshClick={reload}
          />
          <BoardTableActions
            actions={actions}
            selectedRowKeys={selectedRowKeys}
            selectedRecords={selectedRecords}
            resetSelectedRowKeys={() => setSelectedRowKeys([])}
            reload={reload}
          />
        </StyledTableTitleWrapper>
      );
    };

    const rowSelection: TableRowSelection<unknown> = {
      selectedRowKeys,
      onChange: setSelectedRowKeys,
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
