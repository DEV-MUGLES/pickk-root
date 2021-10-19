import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { PageHeader } from 'antd';
import { palette } from '@pickk/design-token';

import { BoardFilter, BoardTable } from '@components/common/organisms';

import { BoardTemplateProps } from './board.type';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  padding: 0.8rem;

  background-color: ${palette.gray1};
`;

const StyledPageHeader = styled(PageHeader)`
  margin-bottom: 0.8rem;

  background-color: ${palette.white};
`;

const DEFAULT_PAGE_SIZE = 20;

export default function BoardTemplate(props: BoardTemplateProps) {
  const propsWithDefault: BoardTemplateProps = {
    ...props,
    defaultPageSize: DEFAULT_PAGE_SIZE,
  };

  const {
    title,
    subTitle,
    useBoardData,
    tableColumns,
    defaultFilter,
    filterInputs,
    defaultPageSize,
    onRowClick = () => null,
  } = propsWithDefault;

  const router = useRouter();

  const [filter, setFilter] = useState<Record<string, unknown>>(defaultFilter);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const {
    data = [],
    total,
    loading,
    refetch,
  } = useBoardData({
    pageInput: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
    filter,
  });

  if (!data && !loading) {
    return null;
  }

  return (
    <StyledWrapper>
      <StyledPageHeader
        title={title}
        subTitle={subTitle}
        onBack={router.back}
      />
      {!!filterInputs && (
        <BoardFilter
          defaultFilter={filter}
          onFilterChange={setFilter}
          inputs={filterInputs}
        />
      )}
      <BoardTable
        {...propsWithDefault}
        dataSource={data}
        totalDataSize={total}
        loading={loading}
        columns={tableColumns}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onRefreshClick={refetch}
        onRowClick={onRowClick}
      />
    </StyledWrapper>
  );
}
