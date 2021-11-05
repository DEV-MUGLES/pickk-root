import { Item, ItemsExhibition } from '@pickk/common';

import HomeItemCard from '../home-item-card';

import styles from './items-exhibition-card.module.scss';

type ItemsExhibitionCardProps = Pick<
  ItemsExhibition,
  | 'backgroundColor'
  | 'imageUrl'
  | 'imageTop'
  | 'imageRight'
  | 'title'
  | 'description'
  | 'videoId'
> & {
  items: { id: number }[] | Item[];
};

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
        {props.description && <p>{props.description}</p>}
        {props.videoId && <button>ONLINE NOW</button>}
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
