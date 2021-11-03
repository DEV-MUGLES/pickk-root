import { useRouter } from 'next/router';

import { ItemsExhibitionEditContainer } from '@containers/items-exhibition';

export default function ItemsExhibitionEditPage() {
  const router = useRouter();

  return (
    <>
      <h1>아이템기획전 추가/수정하는 페이지입니다 ㅎㅎ</h1>
      <ItemsExhibitionEditContainer
        id={router.query.id ? Number(router.query.id) : null}
      />
    </>
  );
}
