import { Typography, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import { BoardTableProps } from './board-table.types';

const { Title } = Typography;

export type BoardTableHeaderProps = {
  total: number;
  onRefreshClick: () => void;
} & Pick<BoardTableProps, 'title'>;

export default function BoardTableHeader(props: BoardTableHeaderProps) {
  const { title, total, onRefreshClick } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Title level={5}>
        {title} 목록 (총 {total} 개)
      </Title>
      <Button onClick={onRefreshClick} icon={<ReloadOutlined />}>
        새로고침
      </Button>
    </div>
  );
}
