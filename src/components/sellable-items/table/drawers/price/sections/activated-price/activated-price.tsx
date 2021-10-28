import { Space, Card, Typography } from 'antd';
import { ItemPrice } from '@pickk/common';

import { addCommaToNumber } from '@common/helpers';

const { Text } = Typography;

const Label = ({ children }: { children: string }) => (
  <Text strong style={{ display: 'inline-block', width: '8rem' }}>
    {children}
  </Text>
);

type CurrentPriceInfoSectionProps = Pick<
  ItemPrice,
  'originalPrice' | 'sellPrice' | 'finalPrice'
> & { isBase: boolean };

export default function ActivatedPriceSection(
  props: CurrentPriceInfoSectionProps
) {
  const { originalPrice, sellPrice, finalPrice, isBase } = props;

  return (
    <>
      <Card style={{ flex: 1, marginBottom: '0.6rem' }}>
        <Space direction="vertical">
          <Text>
            <Label>정가 : </Label>
            {addCommaToNumber(originalPrice)} 원
          </Text>
          <Text>
            <Label>판매가 : </Label>
            {addCommaToNumber(sellPrice)} 원
          </Text>
          <Text>
            <Label>쿠폰적용가 : </Label>
            {addCommaToNumber(finalPrice)} 원
          </Text>
        </Space>
      </Card>
      <Text strong>
        {isBase
          ? '* 공식 홈페이지와 가격을 연동 중입니다. ✅'
          : '* 어드민에서 직접 입력한 가격이 적용 중입니다. 👷‍♂️'}
      </Text>
    </>
  );
}
