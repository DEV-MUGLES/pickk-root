import styled from 'styled-components';
import { Typography, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import { BoardTableProps } from '.';

const { Title } = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export type BoardTableHeaderProps = {
  total: number;
  onRefreshClick: () => void;
} & Pick<BoardTableProps, 'title'>;

export default function BoardTableHeader(props: BoardTableHeaderProps) {
  const { title, total, onRefreshClick } = props;

  return (
    <StyledWrapper>
      <Title level={5}>
        {title} 목록 (총 {total} 개)
      </Title>
      <Button onClick={onRefreshClick} icon={<ReloadOutlined />}>
        새로고침
      </Button>
    </StyledWrapper>
  );
}
