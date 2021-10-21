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
  const { tableRef, title, subTitle, defaultFilter, filterInputs } = props;

  const router = useRouter();

  const [filter, setFilter] = useState<Record<string, unknown>>(defaultFilter);
  const [query, setQuery] = useState(null);

  const handleFilterChange = (newFilter: Record<string, unknown>) => {
    /** query 필드는 filter에서 제외한다. */
    setQuery(newFilter.query ?? null);
    delete newFilter.query;

    setFilter(newFilter);
  };

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
          onFilterChange={handleFilterChange}
          inputs={filterInputs}
        />
      )}
      <BoardTable {...props} ref={tableRef} filter={filter} query={query} />
    </StyledWrapper>
  );
}
