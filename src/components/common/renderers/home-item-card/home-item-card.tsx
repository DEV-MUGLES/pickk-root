import { Brand, Item } from '@pickk/common';

import { addCommaToNumber } from '@common/helpers';

import styles from './home-item-card.module.scss';

type HomeItemCardProps = Pick<
  Item,
  'id' | 'name' | 'imageUrl' | 'originalPrice' | 'finalPrice'
> & {
  brand: Pick<Brand, 'nameKor'>;
};

export default function HomeItemCard(props: HomeItemCardProps) {
  const itemInfo = props.name ? props : null;

  if (!itemInfo) {
    return null;
  }

  const discountRate = Math.floor(
    ((itemInfo.originalPrice - itemInfo.finalPrice) / itemInfo.originalPrice) *
      100
  );

  return (
    <div className={styles.wrapper}>
      <img src={itemInfo.imageUrl} alt={itemInfo.name} />
      <p>
        {itemInfo.brand.nameKor}
        <br />
        {itemInfo.name}
      </p>
      <div className={styles.price}>
        <p>₩ {addCommaToNumber(itemInfo.finalPrice)}</p>
        {discountRate > 0 && <em>{discountRate}%</em>}
      </div>
    </div>
  );
}
