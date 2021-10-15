import { Tooltip, Typography, Badge } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { palette } from '@pickk/design-token';

const { Text } = Typography;

export default function ItemStockTitle() {
  return (
    <Text>
      보유재고
      <Tooltip
        placement="right"
        title={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.4rem',
            }}
          >
            <Badge color="lime" text="재고 충분 (무한재고)" />
            <Badge color="yellow" text="재고가 5개 미만인 옵션 존재" />
            <Badge color="orange" text="옵션 1개 이상 품절" />
            <Badge color="volcano" text="재고 전체 품절" />
          </div>
        }
        color={palette.white}
      >
        <InfoCircleOutlined
          style={{ color: palette.gray4, marginLeft: '0.2rem' }}
        />
      </Tooltip>
    </Text>
  );
}
