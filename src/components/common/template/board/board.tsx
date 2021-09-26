import { useRouter } from 'next/router';
import styled from 'styled-components';
import { PageHeader } from 'antd';
import { palette } from '@pickk/design-token';

import { BoardTable } from '@components/common/organisms';

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
    filter = {},
    onRowClick = () => null,
  } = props;

  const router = useRouter();

  const { data = [], loading, refetch } = useBoardData({ filter });

  const handleBackClick = () => {
    router.back();
  };

  if (!data) {
    return null;
  }

  return (
    <StyledWrapper>
      <StyledPageHeader
        title={title}
        subTitle={subTitle}
        onBack={handleBackClick}
      />
      <BoardTable
        title={title}
        dataSource={data}
        loading={loading}
        columns={tableColumns}
        onRefreshClick={refetch}
        onRowClick={onRowClick}
      />
    </StyledWrapper>
  );
}
