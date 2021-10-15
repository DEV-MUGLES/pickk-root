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

export default function BoardTemplate(props: BoardTemplateProps) {
  const {
    title,
    subTitle,
    useBoardData,
    tableColumns,
    defaultFilter,
    filterInputs,
    onRowClick = () => null,
  } = props;

  const router = useRouter();

  const [filter, setFilter] = useState<Record<string, unknown>>(defaultFilter);

  const { data = [], loading, refetch } = useBoardData({ filter });

  const handleBackClick = () => {
    router.back();
  };

  if (!data && !loading) {
    return null;
  }

  return (
    <StyledWrapper>
      <StyledPageHeader
        title={title}
        subTitle={subTitle}
        onBack={handleBackClick}
      />
      {!!filterInputs && (
        <BoardFilter
          defaultFilter={filter}
          onFilterChange={setFilter}
          inputs={filterInputs}
        />
      )}
      <BoardTable
        {...props}
        dataSource={data}
        loading={loading}
        columns={tableColumns}
        onRefreshClick={refetch}
        onRowClick={onRowClick}
      />
    </StyledWrapper>
  );
}
