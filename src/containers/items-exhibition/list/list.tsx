import Link from 'next/link';

import { ItemsExhibitionCard } from '@components/common/renderers';

import { useItemsExhibitions } from './hooks';

export default function ItemsExhibitionList() {
  const { data: itemsExhibitions } = useItemsExhibitions();

  if (!itemsExhibitions) {
    return null;
  }

  const handleDeleteClick = (id: number) => () => {
    alert('아직 삭제는 미구현 상태입니다. TablePlus를 이용해주세요!');
  };

  return (
    <>
      {itemsExhibitions.map((v) => (
        <div key={v.id} style={{ marginBottom: '24px' }}>
          <span>
            (id: {v.id})
            <Link href={`/exhibition/items/edit?id=${v.id}`}>
              <a>수정하기</a>
            </Link>{' '}
            / <a onClick={handleDeleteClick(v.id)}>삭제하기</a>
          </span>
          <ItemsExhibitionCard {...v} />
        </div>
      ))}
    </>
  );
}
