import { ItemsExhibition } from '@pickk/common';
import { HomeItemCard } from '..';

import styles from './items-exhibition-card.module.scss';

type ItemsExhibitionCardProps = ItemsExhibition;

export default function ItemsExhibitionCard(props: ItemsExhibitionCardProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.intro}
        style={{ backgroundColor: props.backgroundColor }}
      >
        <img
          src={props.imageUrl}
          style={{ top: props.imageTop, right: props.imageRight }}
          alt=""
        />
        <h3>{props.title}</h3>
      </div>
      <div className={styles.items}>
        <div>
          {props.items.map((item) => (
            <HomeItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
