import Link from 'next/link';

import { ItemsExhibitionList } from '@containers/items-exhibition';

export default function ItemsExhibitionPage() {
  return (
    <>
      <Link href="/exhibition/items/edit">
        <a
          style={{
            fontSize: 20,
            border: '1px solid black',
            color: 'red',
            margin: '20px',
          }}
        >
          새 기획전 추가
        </a>
      </Link>
      <ItemsExhibitionList />
    </>
  );
}
