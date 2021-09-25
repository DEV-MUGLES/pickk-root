import { useRouter } from 'next/router';
import styled from 'styled-components';
import { PageHeader, Table, Typography, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { palette } from '@pickk/design-token';

import { BoardTemplateProps } from './board.type';

const { Title } = Typography;

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

const StyledTableTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 6px 16px;
`;

const PAGE_SIZE = 20;

export default function BoardTemplate(props: BoardTemplateProps) {
  const { title, subTitle, useBoardData, tableColumns, filter = {} } = props;

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
      <Table
        size="small"
        title={() => (
          <StyledTableTitleWrapper>
            <Title level={5}>
              {title} 목록 (총 {data.length} 개)
            </Title>
            <Button onClick={refetch} icon={<ReloadOutlined />}>
              새로고침
            </Button>
          </StyledTableTitleWrapper>
        )}
        dataSource={data}
        loading={loading}
        columns={tableColumns}
        pagination={{ position: ['bottomCenter'], pageSize: PAGE_SIZE }}
        scroll={{ x: true }}
      />
    </StyledWrapper>
  );
}
