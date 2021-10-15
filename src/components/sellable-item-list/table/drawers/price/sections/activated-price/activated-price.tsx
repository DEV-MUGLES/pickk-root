import styled from 'styled-components';
import { Space, Card, Typography } from 'antd';
import { ItemPrice } from '@pickk/common';

import { addCommaToNumber } from '@common/helpers';

const { Text } = Typography;

type CurrentPriceInfoSectionProps = Pick<
  ItemPrice,
  'originalPrice' | 'sellPrice' | 'finalPrice' | 'isBase'
>;

export default function ActivatedPriceSection(
  props: CurrentPriceInfoSectionProps
) {
  const { originalPrice, sellPrice, finalPrice, isBase } = props;

  return (
    <>
      <Card style={{ flex: 1 }}>
        <Space direction="vertical">
          <Text>
            <Label strong>정가 : </Label>
            {addCommaToNumber(originalPrice)} 원
          </Text>
          <Text>
            <Label strong>판매가 : </Label>
            {addCommaToNumber(sellPrice)} 원
          </Text>
          <Text>
            <Label strong>쿠폰적용가 : </Label>
            {addCommaToNumber(finalPrice)} 원
          </Text>
        </Space>
      </Card>
      <Message>
        {isBase
          ? '* 공식 홈페이지와 가격을 연동 중입니다. ✅'
          : '* 어드민에서 직접 입력한 가격이 적용 중입니다. 👷‍♂️'}
      </Message>
    </>
  );
}

const Label = styled(Text)`
  display: inline-block;
  width: 8rem;
`;

const Message = styled(Text).attrs({ strong: true })`
  display: block;
  margin: 0.4rem;
  margin-top: 0.6rem;
`;
