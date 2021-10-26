import { Image, Typography } from 'antd';

import styles from './item-card.module.scss';

const { Text } = Typography;

type InquiriesTableItemCardProps = {
  imageUrl: string;
  name: string;
};

export default function InquiriesTableItemCard({
  imageUrl,
  name,
}: InquiriesTableItemCardProps) {
  return (
    <div className={styles.wrapper}>
      <Image src={imageUrl} alt={name} />
      <Text>{name}</Text>
    </div>
  );
}
