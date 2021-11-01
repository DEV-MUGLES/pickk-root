import { Typography } from 'antd';
import { OrderItem, User } from '@pickk/common';

import { addDashToPhoneNumber } from '@src/common/helpers';

import styles from './order.module.scss';

const { Text, Title } = Typography;

type InquiryDetailOrderSectionProps = Pick<
  OrderItem,
  'id' | 'merchantUid' | 'productVariantName' | 'quantity'
> & {
  order: {
    buyer: Pick<User, 'id' | 'name' | 'phoneNumber'>;
  };
};

export default function InquiryDetailOrderSection(
  props: InquiryDetailOrderSectionProps
) {
  const { productVariantName, merchantUid, quantity, order } = props;

  return (
    <div className={styles.wrapper}>
      <Title level={5}>주문 정보</Title>
      <Text>주문상품번호: {merchantUid}</Text>
      <Text>
        주문옵션 (수량): {productVariantName} ({quantity}개)
      </Text>
      <Text>구매자명: {order.buyer.name}</Text>
      <Text>전화번호: {addDashToPhoneNumber(order.buyer.phoneNumber)}</Text>
    </div>
  );
}
