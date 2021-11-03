import { Brand, Item } from '@pickk/common';

import { addCommaToNumber } from '@common/helpers';

import styles from './home-item-card.module.scss';
import { useItem } from './hooks';

type HomeItemCardProps =
  | (Pick<Item, 'id' | 'name' | 'imageUrl' | 'originalPrice' | 'finalPrice'> & {
      brand: Pick<Brand, 'nameKor'>;
    })
  | Pick<Item, 'id'>;

export default function HomeItemCard(props: HomeItemCardProps) {
  const { data: fetched } = useItem('name' in props ? null : props.id);

  const item = 'name' in props ? props : fetched;

  if (!item) {
    return null;
  }

  const discountRate = Math.floor(
    ((item.originalPrice - item.finalPrice) / item.originalPrice) * 100
  );

  return (
    <div className={styles.wrapper}>
      <img src={item.imageUrl} alt={item.name} />
      <p>
        {item.brand.nameKor}
        <br />
        {item.name}
      </p>
      <div className={styles.price}>
        <p>₩ {addCommaToNumber(item.finalPrice)}</p>
        {discountRate > 0 && <em>{discountRate}%</em>}
      </div>
    </div>
  );
}
