import { Typography, Image } from 'antd';
import { Item } from '@pickk/common';

import styles from './item.module.scss';

const { Text, Title, Link } = Typography;

type InquiryDetailItemSectionProps = Pick<Item, 'id' | 'imageUrl' | 'name'>;

export default function InquiryDetailItemSection(
  props: InquiryDetailItemSectionProps
) {
  const { id, imageUrl, name } = props;

  return (
    <div className={styles.wrapper}>
      <Title level={5}>상품 정보</Title>
      <div className={styles.row}>
        <Image src={imageUrl} alt={name} width={'5rem'} />
        <div className={styles.col}>
          <Text>{name}</Text>
          <Link href={`https://pickk.one/items/${id}`} target="_blank">
            핔 공홈링크
          </Link>
        </div>
      </div>
    </div>
  );
}
